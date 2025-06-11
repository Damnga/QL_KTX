import moment from 'moment';
import qs from 'qs';
import crypto from 'crypto';

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
export const createPaymentUrl = (req, res,next) => {
  const vnp_TmnCode ="JWT4N30K"
   const vnp_HashSecret="2XI8R736WVX7AEC0OEQDM4IEPT24FR2X"
   const vnp_Url="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
   const vnp_Api="https://sandbox.vnpayment.vn/merchant_webapi/api/transaction"
   const vnp_ReturnUrl= "http://localhost:3000/thanh_toan/vnpay-return"
   const amount = req.body.amount
    process.env.TZ = 'Asia/Ho_Chi_Minh';
     
     let date = new Date();
     let createDate = moment(date).format('YYYYMMDDHHmmss');
     
     let ipAddr = req.headers['x-forwarded-for'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
     let tmnCode = vnp_TmnCode;
     let secretKey = vnp_HashSecret;
     let vnpUrl = vnp_Url;
     let returnUrl = vnp_ReturnUrl;
     let orderId = moment(date).format('DDHHmmss');
     let locale = null;
     if(locale === null || locale === ''){
         locale = 'vn';
     }
     let currCode = 'VND';
     let vnp_Params = {};
     vnp_Params['vnp_Version'] = '2.1.0';
     vnp_Params['vnp_Command'] = 'pay';
     vnp_Params['vnp_TmnCode'] = tmnCode;
     vnp_Params['vnp_Locale'] = locale;
     vnp_Params['vnp_CurrCode'] = currCode;
     vnp_Params['vnp_TxnRef'] = orderId;
     vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
     vnp_Params['vnp_OrderType'] = 'other';
     vnp_Params['vnp_Amount'] = amount * 100;
     vnp_Params['vnp_ReturnUrl'] = returnUrl;
     vnp_Params['vnp_IpAddr'] = ipAddr;
     vnp_Params['vnp_CreateDate'] = createDate;
    vnp_Params = sortObject(vnp_Params);

 
    let signData = qs.stringify(vnp_Params, { encode: false });
    
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + qs.stringify(vnp_Params, { encode: false });

    res.json({ paymentUrl: vnpUrl });

}
export const vnpayReturn = (req, res) => {
  // Sử dụng đúng nguồn
  console.log('req.query:', req.query);
  console.log('req.body:', req.body);

  const vnpParams = { ...req.query }; // hoặc req.body nếu là POST
  const secureHash = vnpParams['vnp_SecureHash'];

  if (!secureHash) {
    return res.status(400).send('Không có vnp_SecureHash từ VNPAY');
  }

  delete vnpParams['vnp_SecureHash'];
  delete vnpParams['vnp_SecureHashType'];

  const sortedParams = sortObject(vnpParams);
  const signData = Object.entries(sortedParams).map(([k, v]) => `${k}=${v}`).join('&');

  const secretKey = '2XI8R736WVX7AEC0OEQDM4IEPT24FR2X';
  const hash = crypto.createHmac('sha512', secretKey).update(signData).digest('hex');

  if (hash === secureHash) {
    res.send('Chữ ký hợp lệ ✅');
  } else {
    res.status(400).send('Sai chữ ký ❌');
  }
};
