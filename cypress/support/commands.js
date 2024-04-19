import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', () => {
  const username = 'maria@mail.com';
  const password = '12345';

  // 쿠키, local storage, session storage에 있는 정보들을 캐싱
  // 콜백 함수 실행 전 -> 모든 도메인의 쿠키, 로컬 스토리지, 세션 스토리지가 초기화됨.
  // 초기화 진행 후 로그인 완료 -> 세션 정보 설정
  cy.session(username, () => {
    cy.visit('/login');

    cy.findByLabelText('이메일').type(username);
    cy.findByLabelText('비밀번호').type(password);
    cy.findByLabelText('로그인').click();

    cy.location('pathname').should('eq', '/');
  });

  // 로그인 이후 메인 홈페이지로 이동
  cy.visit('/');
});

Cypress.Commands.add('logout', () => {
  cy.findByRole('button', { name: 'Maria' }).click();
  cy.findByRole('button', { name: '확인' }).click();
});

Cypress.Commands.add('assertUrl', url => {
  cy.url().should('eq', `${Cypress.env('baseUrl')}${url}`);
});

Cypress.Commands.add('getProductCardByIndex', index => {
  return cy.findAllByTestId('product-card').eq(index);
});

Cypress.Commands.addQuery('getCartButton', () => {
  // cy.now()로 감싸 호출하면 subject를 받아 inner function에서 쿼리(get)를 실행할 수 있다
  const getFn = cy.now('get', `[data-testid="cart-button"]`);

  // inner function 형태로 반환해야 함.
  return subject => {
    // cart-icon testid를 가진 요소를 조회하는 get 쿼리
    // 우리가 원하는 subject를 기준으로 실행함
    const btn = getFn(subject);

    return btn;
  };
});
