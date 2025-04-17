import React from 'react'
import "./Dashboard.css"
import Header_admin from '../../component/Header_admin/Header_admin';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import Calendar from '../../component/Calendar/Calendar';
const Dashboard = () => {
  const lineData = [
    { name: 'Mon', uv: 400 },
    { name: 'Tue', uv: 600 },
    { name: 'Wed', uv: 300 },
    { name: 'Thu', uv: 500 },
    { name: 'Fri', uv: 900 },
    { name: 'Sat', uv: 700 },
    { name: 'Sun', uv: 1000 },
  ];
  const pieData = [
    { name: 'Desktop', value: 60 },
    { name: 'Tablet', value: 25 },
    { name: 'Mobile', value: 15 },
  ];
  const stats = [
    { icon: "📊", value: "2,345", label: "Weekly Visit", change: "-16%", color: "red" },
    { icon: "📈", value: "165", label: "Daily Visit", change: "+23%", color: "green" },
    { icon: "🟠", value: "$2 345.00", label: "Weekly Sale", change: "0%", color: "gray" },
  ];
  const COLORS = ['#007bff', '#ffc107', '#28a745'];
  return (
    <div className='dashboard'>
      <div className="dashbar_container">
        <Header_admin/>
        <div className="stats-cards">
          {stats.map((item, index) => (
            <div key={index} className="card">
              <div className="card-icon">{item.icon}</div>
              <div className="card-value">{item.value}</div>
              <div className="card-label">{item.label}</div>
              <div className={`card-change ${item.color}`}>{item.change}</div>
            </div>
          ))}
        </div>
        <div className="button-panel">
          <button className="btn btn-primary">Add New User</button>
          <button className="btn btn-secondary">View Reports</button>
          <button className="btn btn-success">Settings</button>
          <button className="btn btn-danger">Delete</button>
          <button className="btn btn-warning">Warning</button>
          <button className="btn btn-info">Info</button>
        </div>
        <div className="charts-container">
          <div className="line-chart-box">
    <h3>Line Chart</h3>
    <LineChart width={990} height={300} data={lineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
          </div>
          <div className="pie-chart-box">
    <h3>Pie Chart</h3>
    <PieChart width={430} height={300}>
      <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={120} label>
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
          </div>
        </div>
        <Calendar/>
      </div>
    </div>
  )
}

export default Dashboard
