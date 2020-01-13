import React from "react"
import { Link } from "react-router-dom"

// style
import "../styles/landing.scss"

// ant design
import { Button } from "antd"

function Landing() {
  return (
    <div className="landing-container">
      <div className="title-container">
        <div className="mobile up">
          <p className="title-01">งานฟุตบอลประเพณี จุฬาฯ-ธรรมศาสตร์ ครั้งที่ 74</p>
          <h1 className="title-02">MAKE A CHANGE</h1>
        </div>
        <div className="mobile down">
          <p className="title-01">
            งานฟุตบอลประเพณี <br /> จุฬาฯ-ธรรมศาสตร์ ครั้งที่ 74
          </p>
          <h1 className="title-02">
            MAKE A <br />
            CHANGE
          </h1>
        </div>
        <h1 className="title-03">เปลี่ยนปรับ ขยับสังคม</h1>
      </div>
      <div className="register-button-container">
        <Link to="/register">
          <Button type="primary" className="register-button">
            ลงทะเบียน
          </Button>
        </Link>
        <Link to="/login" className="getstatus-button">
          ตรวจสอบข้อมูล
        </Link>
      </div>
    </div>
  )
}

export default Landing
