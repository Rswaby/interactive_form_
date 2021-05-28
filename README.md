# interactive_form_

### Project Structure

    interactive_form_            # root folder
        ├── css                  # contains css files including styles.css
        ├── img                  # images for display
        ├── js                   # folder constaining script.js
        ├── index.html           # html doc that renders in the browser
        └── README.md

## Real time error message 
Field: Email 
when user starts typing in the email field the error message will show until a valid email address is detected. 

## Conditional error message 
Field: Email
If the email address field is empty, error message will show: 'Email address cannot be blank'
If the email address field is not formatted correctly error message will show: 'Email address must be formatted correctly'

### Credit Card
small note about the credit card field:
credit card feild should follow one of Visa, Master card or American Express formats to be valid not just 13-16 characters
example:

```visa: 4111111111111111 : 16 length, 4642307997554 : 13 digits, 4143618179763 : 13 digits```
```MasterCard: 5555555555554444 : 16 length```
```American Express: 378282246310005 : 15 length```

### How to run
open in the browser
```sh
index.html
```
