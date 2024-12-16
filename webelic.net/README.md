# backend
 cd backend
 npm i
 npm run dev
 
# frontend
 cd frontend
 npm i
 npm run dev







 # site_html

 https://chatgpt.com/c/6756c188-ccb4-8012-b626-3c74512d963d



tee minulle kauppa sovellus joka toimii Live Server (html,js, css)
tuotteet ovat data/products.json tiedostossa: on tuote tiedot
maksu/osto tapahtumat ovat data/payments.json tiedostossa: on käyttäjien osto/maksu historia ja kortti tiedot osto tapahtumasta, muut tiedot
admin kirjautumis tiedot ovat data/admins.json tiedostossa: tänne talnetuu admin käyttäjinetiedot jotka voi hallinta sivustoa eli hallita käyttäjiä, osto/maksu tapahtumia ja tuotteita (mm. hintaa, kuvausta, tietoja, määrää varastossa)
käyttäjätiedot ovat data/users.json tiedostossa: tänne tallnetuu kaikkien rekisteroityjen käyttäjien tiedot (osto/maksu tapahtumia ei voi tehdä ilman käyttäjää)

tee ostoskori ominaisuus 
kun tuotteen avaa se avautuu product.html tiedostoon
tee pagination sivulle
tee hakutoiminto ja filter ominainuus että voi rajata hinnan, btandin, kategorian, ratingin mukaan 

products.json 
[
    {
        "ID": 1,
        "name": "tuote1",
        "description": "tuotteen1 kuvaus",
        "price": 150.95,
        "category": "eletroniikka",
        "stock": 150,
        "brand": "ComCam",
        "rating": 4.5,
        "reviews": [
            {
              "customer": "",
              "rating": 5,
              "comment": "!"
            },
            {
              "customer": "",
              "rating": 4,
              "comment": ""
            }
          ],
        "date_added": "10-07-2024",
        "supplier": "Tuonti Oy",
        "warranty": "2 years",
        "availability": "instock"
    }
]

payments.json 
{
  "payments": [
    {
      "payment_id": "PMT123456",
      "order_id": "ORD987654",
      "user_id": "USR001",
      "amount": 129.99,
      "currency": "EUR",
      "payment_method": "Credit Card",
      "status": "completed",
      "transaction_date": "2024-12-10T14:30:00Z",
      "payment_gateway": "Stripe",
      "card_details": {
        "card_type": "Visa",
        "last_four": "1234",
        "expiry_date": "12/2026"
      },
      "payer": {
        "name": "Matti Meikäläinen",
        "email": "matti.meikalainen@example.com",
        "address": {
          "line1": "Esimerkkikatu 1",
          "line2": "Apt 2",
          "city": "Helsinki",
          "postal_code": "00100",
          "country": "FI"
        }
      },
      "billing_address": {
        "name": "Matti Meikäläinen",
        "street": "Esimerkkitie 10",
        "city": "Helsinki",
        "postal_code": "00100",
        "country": "FI"
      }

    }
  ]
}


admins.json
{
    "admins": [
      {
        "admin_id": "ADM001",
        "name": "Pekka Pääkäyttäjä",
        "email": "pekka.paakayttaja@example.com",
        "phone": "+358501234567",
        "password": "hashed_password_admin123",
        "role": "Super Admin",
        "permissions": ["manage_users", "manage_orders", "view_reports", "manage_products"],
        "created_date": "2023-05-10T14:30:00Z",
        "last_login": "2024-12-09T10:15:00Z",
        "is_active": true
      },
      {
        "admin_id": "ADM002",
        "name": "Liisa Tuki",
        "email": "liisa.tuki@example.com",
        "phone": "+358501987654",
        "password": "hashed_password_admin456",
        "role": "Support Admin",
        "permissions": ["manage_users", "view_orders"],
        "created_date": "2024-01-15T09:00:00Z",
        "last_login": "2024-12-08T16:45:00Z",
        "is_active": true
      }
    ]
  }
  

users.json
{
    "users": [
      {
        "user_id": "USR001",
        "name": "Matti Meikäläinen",
        "email": "matti.meikalainen@example.com",
        "phone": "+358401234567",
        "password": "hashed_password_123",
        "address": {
          "street": "Esimerkkitie 10",
          "city": "Helsinki",
          "postal_code": "00100",
          "country": "FI"
        },
        "registered_date": "2024-12-01T12:00:00Z",
        "last_login": "2024-12-09T18:45:00Z",
        "is_active": true
      }
    ]
  }
