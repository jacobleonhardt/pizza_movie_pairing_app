# pieflix
by Jacob Leonhardt | [Checkout pieflix](https://pieflix.herokuapp.com/)

![pieflix Landing page](https://media-exp3.licdn.com/dms/image/C5622AQFXSrCIzH8_fQ/feedshare-shrink_2048_1536/0/1625862936817?e=1628726400&v=beta&t=zj83oBbKwTBlIilwVY_BKKMmjwYk4N1zFfOr-f603WA)

## The Gist

Pieflix is a full stack application used to create pairings of pizza companies and movies. The app allows users to search the TMDb database by selecting one of two processes: Find a Film, or Pick a Pizza.

With Find a Film, the user selects a pizza brand and the app searches for a movie using predefined filters. When a paring is displayed, users can click the "Not Feeling It" button. If they do, pieflix will search the TMDb database for a different film that matches the same query filters. (The rejected movie will not be displayed in their list of previous pairings.)

![pieflix Find a Film example](https://media-exp3.licdn.com/dms/image/C5622AQE5Pro4A-H2Ew/feedshare-shrink_2048_1536/0/1625862940649?e=1628726400&v=beta&t=QT5XIJbCxt6uSZTgziOgOq19eNi1UaSGduM2XLi5XxI)

Alternatively, with Pick a Pizza, the user inputs their selected movie's title and release year into a form and the app selects a pizza brand.

![pieflix Pick a Pizza example](https://media-exp3.licdn.com/dms/image/C5622AQHh2wqognWJeg/feedshare-shrink_2048_1536/0/1625862941161?e=1628726400&v=beta&t=i_axJ1HBh7lV3lpmkSC0x4NK9HrWa3mbghB26sTf-6U)

Both processes are done by filling out a simple form on the New Pair (`/pair`) page. Previous pairings are displayed on the Pairings (`/`) page, where users can also review their previous pairings by clicking on either a thumbs up or thumbs down button. Previous pairings can also be deleted by click on the trash can button.

![pieflix share on social media example](https://media-exp3.licdn.com/dms/image/C5622AQGnjUTl0mPIow/feedshare-shrink_2048_1536/0/1625862938075?e=1628726400&v=beta&t=IJ6HqtUwfSVQnNVEyEYRSyAIq4LabEfelzbYCEfBXx0)

Users also have the option to share pairings they like on Facebook, Twitter, and Reddit.

![pieflix share on social media example](https://media-exp3.licdn.com/dms/image/C5622AQGw6l4z0vYrHA/feedshare-shrink_2048_1536/0/1625862938100?e=1628726400&v=beta&t=EQKaAYFQjvNiqQBv8AmGMfWOIveEW8XcmdoGU2k24HY)

### A note about querying

When an user choses to Find a Film, the backend of pieflix checks the list of returned movie queries from TMDb, and compares it to a list of the user's previously paired movies. Movies not found in the previously paired list are then placed into a list of possible selections, and a movie is selected randomly from that list. In this way, a user should not receive the same pizza-movie pairing twice. The exceptions to this are:
    1. If the user choses to search via Pick a Pizza, and inputs a movie they have previously paired.
    2. The user deletes the previous pair; in which case the pair would not be included in the previously paired movie list.

## The Stack

### Backend

* Python
* Flask
* SQLAlchemy
* PostgreSQL
* WTForms
* [Requests](https://docs.python-requests.org/en/master/user/quickstart/#make-a-request)
* Random

### Frontend

* JavaScript/JSX
* React
* Redux
* [React-Share](https://www.npmjs.com/package/react-share)

### Extras/Third-Party

* [TMDb (The Movie Database)](https://www.themoviedb.org/)
