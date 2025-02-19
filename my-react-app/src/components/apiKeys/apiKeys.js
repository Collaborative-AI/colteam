import React, { Component } from 'react';
import { getToken } from '../../utils';

class ApiKeysList extends Component {
  state = {
    apiKeys: [], // 用于存储从后端获取的 API keys
    isLoading: true, // 加载状态标志
  };

  componentDidMount() {
    this.fetchApiKeys();
  }

  fetchApiKeys = () => {
    const refreshToken = getToken();
    const API_ENDPOINT = 'http://localhost:8000/users/apiKey/list/';

    fetch(API_ENDPOINT, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => this.setState({ apiKeys: data, isLoading: false }))
      .catch(error => {
        console.error('Error fetching API keys:', error);
        this.setState({ isLoading: false });
      });
  };

  handleApplyApiKey = () => {
    const refreshToken = getToken();
    const API_ENDPOINT = 'http://localhost:8000/users/apiKey/generate/';
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
      },
    })
    window.location.reload();
    console.log('Applying for API Key...');
  };

  render() {
    const { apiKeys, isLoading } = this.state;
    return (
      <div class="full-screen-container">
       <div class = "top-left-title">
        <h4>Existing API Keys</h4>
       </div>
       
        <div class = "container-30pad pad-left-20">
          <p class="fw-medium fs-5 text-body-secondary">
          Your API keys are listed below. Please do not share your API key with others.
          </p>
         
        <div class = "container-30pad ">
        <button class ="btn btn-secondary fw-medium fs-5" onClick={this.handleApplyApiKey}>Apply for API Key</button>
       
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table class="container-30pad">
            <thead>
              <tr>
                <th class = "fw-semibolds fs-5" style={{padding: '10px', borderBottom: '1.5px solid #dcdcdc'}} >Key</th>
                <th class = "fw-semibold fs-5" style={{padding: '10px' , borderBottom: '1.5px solid #dcdcdc'}}>Active</th>
              </tr>
              

            </thead>
            <tbody>
              {apiKeys.map((apiKey, index) => (
                <tr key={index}>
                  <td class = "text-body-secondary fw-semibolds fs-5" style={{ padding: '10px' }}>{apiKey.key}</td>
                  <td class = "text-body-secondary fw-semibolds fs-5" style={{ padding: '10px' }}>{apiKey.is_active ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
        
      </div>
      </div>
    );
  }
}

export default ApiKeysList;
