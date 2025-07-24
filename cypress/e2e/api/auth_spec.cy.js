
const baseUrl = 'http://51.21.180.48:8080/api'; // ✅ Correct base URL

describe('Auth API Tests', () => {
  const credentials = {
    email: "admin@dental.com",
    password: "password"
  };

  let accessToken = '';
  let refreshToken = '';

  it('Register Super Admin', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/register`,
      failOnStatusCode: false,
      body: {
        ...credentials,
        name: "John Doe",
        role: "superadmin",
        gender: "male",
        isEmailVerified: true,
        isActive: true,
        isBlock: false,
        otp: 123456,
        contact: "+1234567890",
        deviceToken: "abcdef123456",
        DOB: "1990-01-01T00:00:00.000Z",
        image: "https://example.com/uploads/profile.jpg"
      }
    }).then((res) => {
      cy.log('Register response: ', res.body);
      expect([201, 409]).to.include(res.status);
    });
  });

  it('Login with valid credentials', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/login`,
      failOnStatusCode: false,
      body: credentials
    }).then((res) => {
      cy.log('Login response: ', res.body);
      expect(res.status).to.eq(200);
      accessToken = res.body?.token?.access?.token || '';
      refreshToken = res.body?.token?.refresh?.token || '';
      expect(accessToken).to.not.be.empty;
    });
  });

  it('Logout with refresh token', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/auth/logout`,
      failOnStatusCode: false,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: {
        refreshToken: refreshToken
      }
    }).then((res) => {
      cy.log('Logout response: ', res.body);
      expect([200, 401]).to.include(res.status);
    });
  });
});
