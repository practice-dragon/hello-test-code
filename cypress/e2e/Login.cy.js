beforeEach(() => {
  cy.visit('/login');
  cy.findByLabelText('로그인').as('loginBtn');
});

it('이메일을 입력하지 않고 로그인 버튼을 클릭할 경우 "이메일을 입력하세요" 경고 메세지가 노출된다', () => {
  // get API -> Cypres에서 지저한 alias로 선언한 요소에 접근 가능
  // 체이닝 형태로 테스트 코드 작성 -> 테스트 코드를 이해하기 쉬움. 코드 간결하게 작성 가능.
  cy.get('@loginBtn').click();

  cy.findByText('이메일을 입력하세요').should('exist');
});

it('비밀번호를 입력하지 않고 로그인 버튼을 클릭할 경우 "비밀번호를 입력하세요" 경고 메세지가 노출된다', () => {
  cy.get('@loginBtn').click();

  cy.findByText('비밀번호를 입력하세요').should('exist');
});

it('잘못된 양식의 이메일을 입력한 뒤 로그인 버튼을 클릭할 경우 "이메일 양식이 올바르지 않습니다" 경고 메세지가 노출된다', () => {
  // 1. 이메일 요소 조회 커맨드 실행 -> 완료되어야 type 커맨드로 subject가 넘어가 실행됨
  // 2.type 커맨드로 텍스트 입력
  cy.findByLabelText('이메일').type('wrongemail#mail.com');
  cy.findByLabelText('로그인').click();

  cy.findByText('이메일 양식이 올바르지 않습니다').should('exist');
});

it('회원 가입 클릭 시 회원 가입 페이지로 이동한다', () => {
  cy.findByText('회원가입').click();

  cy.assertUrl('/register');
});

it('성공적으로 로그인 되었을 경우 메인 홈 페이지로 이동하며, 사용자 이름 "Maria"와 장바구니 아이콘이 노출된다', () => {
  cy.login(); // 커스컴 커맨드. test-example-shopping-mall/cypress/support/commands.js 에 위치.

  cy.assertUrl('/');
  cy.findByText('Maria').should('exist');
  cy.findByTestId('cart-icon').should('exist');
});
