const baseUrl = 'http://51.21.180.48:8080';

describe('Dental App Role APIs', () => {
  const credentials = {
    email: "admin@dental.com",
    password: "password"
  };

  let accessToken = '';
  let roleId = '';

  before(() => {
    // Get JWT token
    cy.request({
      method: 'POST',
      url: `${baseUrl}/api/auth/login`,
      body: credentials,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);
      accessToken = res.body.token.access.token;
    });
  });

  it('Create new role (POST /role)', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/role`, // ✅ Corrected endpoint
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: {
        for: 'superadmin'
      },
      failOnStatusCode: false
    }).then((res) => {
      cy.log('Create Role Response:', JSON.stringify(res.body));

      expect([200, 201]).to.include(res.status);         // ✅ Flexible status check
      expect(res.body).to.have.property('status', 1);     // ✅ Assert business status
      expect(res.body.data).to.have.property('_id');      // ✅ Ensure ID is returned

      roleId = res.body.data._id;
    });
  });

  it('Get all roles (GET /role)', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/role`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('status', 1);
    });
  });

  it('Get role by ID (GET /role/:id)', function () {
    if (!roleId) this.skip();

    cy.request({
      method: 'GET',
      url: `${baseUrl}/role/${roleId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.data._id).to.eq(roleId);
    });
  });

  it('Delete role (DELETE /role/:id)', function () {
    if (!roleId) this.skip();

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/role/${roleId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      failOnStatusCode: false
    }).then((res) => {
      expect([200, 204]).to.include(res.status);
    });
  });
});
