// import React, { Component } from 'react'
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../AuthProvider.component'
import ProjectItem from './allproject/projectItem.component'
import { Col, Divider, Row } from 'antd'


const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' }
function Project () {
    const { auth } = useContext(AuthContext)
    useEffect(() => {
        // URL
        const backendURL = 'http://localhost:8000'
        axios
            .get(`http://localhost:8000/projects/detail/view_all`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => console.error('Error fetching project data:', error))
    }, [])

    const projects = []
    for (var i = 0; i < 5; i++) {
        projects.push({
            projectName: i + ": Name of Project",
            ownerName: "hhhh@gmail.com"
        })
    }

    return (
        <form>
            <h3>Project</h3>
            <Row gutter={[16, 24]}>
                {projects.map(p => (
                    <Col className="gutter-row" span={12}>
                        <ProjectItem
                            style={style}
                            projectName={p.projectName}
                            ownerName={p.ownerName}
                        />
                    </Col>
                ))}
            </Row>
        </form>
    )

}

export default Project

