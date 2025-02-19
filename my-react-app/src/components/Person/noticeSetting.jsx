import { Switch } from 'antd';
export default function () {
  return (
    <div>
      <div style={{ fontSize: "24px" }}>通知设置</div>
      <div style={{display:"flex",justifyContent:"space-between",height:"30px",alignItems:"center"}} className="notice-item">
        <span>通知设置1</span>
        <Switch defaultChecked  />
      </div>
      <div style={{display:"flex",justifyContent:"space-between",height:"30px",alignItems:"center"}} className="notice-item">
        <span>通知设置2</span>
        <Switch defaultChecked  />
      </div>
      <div style={{display:"flex",justifyContent:"space-between",height:"30px",alignItems:"center"}} className="notice-item">
        <span>通知设置3</span>
        <Switch defaultChecked  />
      </div>
      <div style={{display:"flex",justifyContent:"space-between",height:"30px",alignItems:"center"}} className="notice-item">
        <span>通知设置4</span>
        <Switch defaultChecked  />
      </div>
    </div>
  );
}
