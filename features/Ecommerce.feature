Feature: Order Validations
    @Regression
    Scenario: Place an order for a product
        Given Login to website with "satheeshreddy0520@gmail.com" and "@Reddys143"
       When search for a product "ZARA COAT 3" add to cart
        Then verify the produt is added to cart "ZARA COAT 3" and checkout
        When place the order in my orders page
        Then verify the order is present in orders page is "ZARA COAT 3" and view the order details

 @Validations
    @foo
    Scenario Outline: Place an order for a product
        Given Login to website2 with "<username>" and "<password>"
        Then verify logging is incorrect 

        Examples:
            | username            | password |
            | satheeshreddy1=@gmail.com | @Reddys143 |
            | satheesh11@gmail.com | @Satheesh123 |
            | pandu1234@gmail.com | @Pandu123 |