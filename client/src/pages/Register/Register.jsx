import React,{useState} from 'react'
import './Register.css'
import Stepprogress from "../../component/StepProgress/Stepprogress";
const Register = () => {
    const [step, setStep] = useState(0);
    return (
        <div>
            <Stepprogress currentStep={step} />
            <div style={{ marginTop: "40px", textAlign: "center" }}>
                <button onClick={() => setStep((s) => Math.max(0, s - 1))}>← Quay lại</button>
                <button onClick={() => setStep((s) => Math.min(5, s + 1))} style={{ marginLeft: "20px" }}>Tiếp →</button>
            </div>
            {step === 0 && <div>Đăng ký tài khoản</div>}
            {step === 1 && <div>Nhập thông tin cá nhân</div>} 
            {step === 2 && <div>Nhập thông tin liên hệ</div>}
            {step === 3 && <div>Nhập thông tin tài khoản</div>}
            {step === 4 && <div>Nhập thông tin bảo mật</div>}
            {step === 5 && <div>Xác nhận thông tin</div>}  
        </div>
    )
}

export default Register