# REST-Webbtjänst Projekt DT207G
***Av Alexander Hilding***

## Arbetsgång
* Skapat MongoDB-databas via MongoDB Atlas.
* Anslutit till databasen med MongoDB Compass för bättre översikt av data.
* Initierat npm-projekt.
* Installerat paket:
    * **express**, webbappram för att skapa server som kan ta emot och hantera http-förfrågningar.
    * **mongoose**, paket för anslutning till MongoDB-databas.
    * **dotenv**, paket för att hantera miljövariabler.
    * **cors**, paket som tillhandahåller en connect/express middleware för att aktivera CORS.
    * **jsonwebtoken**, för att skapa och verifiera tokens.
    * **bcrypt**, för att hasha och jämföra lösenord.
    * **nodemon** --save-dev, verktyg för att automatiskt starta om applikationen vid upptäckt av filändring.
    * **xss**, för att sanera input och skydda mot XSS-attacker.
    * **router**, ett expresspaket för att skapa modulära rutt-hanterare.
* Använt Thunder Client som plug-in i VSCode för att testa API-anrop.
* Satt upp ett git-repo och initierat server.js med grundläggande server-setup och API-rutter.
* Skapat ett Mongoose-schema och modell för användare.
* Implementerat autentiseringslogik inklusive registrering och inloggning.
* Publicerat webbtjänsten på Render.

### Projektets komponeter
* **server.js** - Huvudfil för servern som konfigurerar middleware, rutter och anslutning till databasen. Innehåller även autentiseringsmiddleware.
* **authRoutes.js** - Definierar autentiseringsrelaterade rutter såsom registrering och inloggning. Hanterar routing-logiken separat från huvudserverfilen för bättre modularitet.
* **menuRoutes.js** - Hanterar rutter för att skapa, läsa, uppdatera och ta bort menyobjekt. Dessa rutter är skyddade med JWT-autentisering.
* **bookingRoutes.js** - Hanterar rutter för att skapa, läsa, uppdatera och ta bort bokningar. Dessa rutter är skyddade med JWT-autentisering.
* **user.js** - Innehåller Mongoose-schema och modellen för användare. Definierar användarstruktur, valideringslogik och lösenordshashning.
* **menuItem.js** - Innehåller Mongoose-schema och modellen för menyobjekt. Definierar struktur och valideringslogik för menyobjekt.
* **booking.js** - Innehåller Mongoose-schema och modellen för bokningar. Definierar struktur och valideringslogik för bokningar.
* **authenticateToken-funktion** - Ett middleware som verifierar JWT-token från inkommande begäranden. Extraherar användarnamnet från den dekrypterade tokenen för vidare användning i andra rutter.

## Länk
API'et finns tillgängligt på https://dt207g-project-backend.onrender.com/api/

## Användning
Såhär når du API'et:
| Metod | Ändpunkt  | Beskrivning |
|--|--|--|
| POST | /api/register |	Registrerar en ny användare. |
| POST | /api/login |	Loggar in en användare och returnerar en JWT. |
| GET | /api/protected |	Hämtar skyddad data, endast tillgänglig med giltig JWT. |
| GET | /api/customermenu |	Hämtar alla menyobjekt (oskyddad). |
| POST | /api/customerbooking |	Skapar en ny bokning (oskyddad). |
| GET |	/api/menu |	Hämtar alla menyobjekt (skyddad). |
| POST |	/api/menu |	Skapar ett nytt menyobjekt (skyddad). |
| PUT |	/api/menu/:id |	Uppdaterar ett menyobjekt (skyddad). |
| DELETE |	/api/menu/:id |	Tar bort ett menyobjekt (skyddad). |
| GET |	/api/booking |	Hämtar alla bokningar (skyddad). |
| POST |	/api/booking |	Skapar en ny bokning (skyddad). |
| PUT |	/api/booking/:id |	Uppdaterar en bokning (skyddad). |
| DELETE |	/api/booking/:id |	Tar bort en bokning (skyddad). |


### Exempel på JSON-objekt för användarregistrering:

```
{
   "username": "användarnamn",
   "password": "lösenord"
}
```

### Exempel på JSON-objekt för att skapa ett menyobjekt:

```
{
   "name": "Rabbemos med fläsk",
   "description": "Klassisk skånsk rotmos med fläsk",
   "price": 120,
   "category": "main course"
}
```

### Exempel på JSON-objekt för att skapa en bokning:

```
{
   "name": "Sven Svensson",
   "date": "2024-06-01",
   "time": "19:00",
   "numberOfPeople": 4,
   "specialRequests": "Glutenintolerant"
}
```