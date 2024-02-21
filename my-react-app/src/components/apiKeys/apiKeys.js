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
      <div>
        <h4>Existing API Keys</h4>
        <button onClick={this.handleApplyApiKey}>Apply for API Key</button>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((apiKey, index) => (
                <tr key={index}>
                  <td>{apiKey.key}</td>
                  <td>{apiKey.is_active ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default ApiKeysList;
