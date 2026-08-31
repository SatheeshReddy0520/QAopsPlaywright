Feature: Order Validations
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

      
