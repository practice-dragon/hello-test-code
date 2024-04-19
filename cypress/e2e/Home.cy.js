beforeEach(() => {
  cy.visit('/');
});

// 특정 파일에서만 반복되는 단언이나 커맨드 -> 별도 함수로 추상화하여 분리
const asssertProductCardLenth = length => {
  cy.findAllByTestId('product-card').should('have.length', length);
};

it('초기 상품은 20개가 노출된다', () => {
  asssertProductCardLenth(20);
});

it('show more 버튼을 클릭할 경우 상품이 20개 더 노출된다', () => {
  cy.findByText('Show more').click();
  asssertProductCardLenth(40);
});

describe('장바구니 / 구매 버튼', () => {
  // 통합 테스트의 jsDOM 환경: 실제로 로그인 페이지로 이동하는지 확인 불가
  // E2E 테스트: 브라우저의 URL 주소가 로그인 페이지로 이동했는지 검증 가능!
  describe('로그인을 하지 않은 경우', () => {
    it('장바구니 버튼 클릭 시 로그인 페이지로 이동한다', () => {
      cy.getProductCardByIndex(0).findAllByText('장바구니').click();
      cy.assertUrl('/login');
    });
    it('구매 버튼 클릭 시 로그인 페이지로 이동한다', () => {
      cy.getProductCardByIndex(0).findAllByText('장바구니').click();
      cy.assertUrl('/login');
    });
  });

  describe('로그인 시', () => {
    beforeEach(() => {
      cy.login();
    });
    it('장바구니에 아무것도 추가하지 않은 경우 장바구니 아이콘 뱃지에 숫자가 노출되지 않는다', () => {
      cy.getCartButton().should('have.text', '');
    });

    it('장바구니 버튼 클릭 시 "장바구니 추가 완료!" 알림 메세지가 노출되며, 장바구니에 담긴 수량도 증가한다', () => {
      cy.getProductCardByIndex(0).findByText('장바구니').click();

      cy.findByText('Handmade Cotton Fish 장바구니 추가 완료!').should('exist');
      cy.getCartButton().should('have.text', '1');

      cy.getProductCardByIndex(1).findByText('장바구니').click();

      cy.findByText('Awesome Concrete Shirt 장바구니 추가 완료!').should(
        'exist',
      );
      cy.getCartButton().should('have.text', '2');
    });

    it('구매 버튼 클릭시 해당 아이템이 장바구니에 추가되며, 장바구니 페이지로 이동한다', () => {
      cy.getProductCardByIndex(0).findByText('구매').click();

      cy.assertUrl('/cart');
      cy.getCartButton().should('have.text', '1');
      cy.findAllByText('Handmade Cotton Fish').should('exist');
    });
  });
});

describe('필터', () => {
  it('상품명을 "Handmade Cotton"로 입력하면 해당 상품명을 포함한 상품만 나타난다', () => {});

  it('카테고리를 "Shoes"로 선택할 경우 해당 카테고리 상품만 나타난다', () => {});

  it('최소 가격을 "15", 최대 가격을 "20"로 입력한 경우 해당 금액 사이에 있는 상품이 노출된다', () => {});

  it('상품명 "Handmade", 카테고리 "Shoes", 최소 금액 "750", 최대 금액 "800"로 입력하면 모든 조건을 충족하는 상품만 노출된다', () => {});
});

it('상품을 클릭할 경우 클릭한 상품의 상세 페이지로 이동한다', () => {});
