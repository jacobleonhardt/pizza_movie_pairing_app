# pieflix
by Jacob Leonhardt | [Checkout pieflix](https://pieflix.herokuapp.com/)

Table of Contents
* [The Gist](#the-gist)
* [The Stack](#the-stack)
* [Backend Overview](#backend-overview)
* [Frontend Overview](#frontend-overview)
* [Next Steps](#next-steps)
* [Contributions](#contributions)

***

![pieflix Landing page](https://media-exp3.licdn.com/dms/image/C5622AQFXSrCIzH8_fQ/feedshare-shrink_2048_1536/0/1625862936817?e=1628726400&v=beta&t=zj83oBbKwTBlIilwVY_BKKMmjwYk4N1zFfOr-f603WA)

## <a name="the-gist"></a>The Gist

Pieflix is a full stack application used to create pairings of pizza companies and movies. The app allows users to search the TMDb database by selecting one of two processes: Find a Film, or Pick a Pizza.

With Find a Film, the user selects a pizza brand and the app searches for a movie using predefined filters. When a paring is displayed, users can click the "Not Feeling It?" button. If they do, pieflix will search the TMDb database for a different film that matches the same query filters. (The rejected movie will not be displayed in their list of previous pairings.)

![pieflix Find a Film example](https://media-exp3.licdn.com/dms/image/C5622AQE5Pro4A-H2Ew/feedshare-shrink_2048_1536/0/1625862940649?e=1628726400&v=beta&t=QT5XIJbCxt6uSZTgziOgOq19eNi1UaSGduM2XLi5XxI)

Alternatively, with Pick a Pizza, the user inputs their selected movie's title and release year into a form, and the app selects a pizza brand.

![pieflix Pick a Pizza example](https://media-exp3.licdn.com/dms/image/C5622AQHh2wqognWJeg/feedshare-shrink_2048_1536/0/1625862941161?e=1628726400&v=beta&t=i_axJ1HBh7lV3lpmkSC0x4NK9HrWa3mbghB26sTf-6U)

Both processes are done by filling out a simple form on the New Pair (`/pair`) page. Previous pairings are displayed on the Pairings (`/`) page, where users can also review their previous pairings by clicking on either a thumbs up or thumbs down button. Previous pairings can also be deleted by click on the trash can button.

![pieflix share on social media example](https://media-exp3.licdn.com/dms/image/C5622AQGnjUTl0mPIow/feedshare-shrink_2048_1536/0/1625862938075?e=1628726400&v=beta&t=IJ6HqtUwfSVQnNVEyEYRSyAIq4LabEfelzbYCEfBXx0)

Users also have the option to share pairings they like on Facebook, Twitter, and Reddit.

![pieflix share on social media example](https://media-exp3.licdn.com/dms/image/C5622AQGw6l4z0vYrHA/feedshare-shrink_2048_1536/0/1625862938100?e=1628726400&v=beta&t=EQKaAYFQjvNiqQBv8AmGMfWOIveEW8XcmdoGU2k24HY)

### A Note About Querying

When an user choses to Find a Film, the backend of pieflix checks the list of returned movie queries from TMDb, and compares it to a list of the user's previously paired movies. Movies not found in the previously paired list are then placed into a list of possible selections, and a movie is selected randomly from that list. In this way, a user should not receive the same pizza-movie pairing twice. The exceptions to this are:
    1. If the user choses to search via Pick a Pizza, and inputs a movie they have previously paired.
    2. The user deletes the previous pair; in which case the pair would not be included in the previously paired movie list.

***

## <a name="the-stack"></a>The Stack

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

### Datbase

* [TMDb (The Movie Database)](https://www.themoviedb.org/)*

*This product uses the TMDb API but is not endorsed or certified by TMDb.

***

## <a name="backend-overview"></a>Backend Overview

The foundation of pieflix is based on two key elements: the database schema, and the use of TMDb's API. You can view the initial pieflix database by checkout the Database Schema section of the [pieflix wiki](https://github.com/jacobleonhardt/pizza_movie_pairing_app/wiki/Database-Schema). The Wiki schema does not display the attribute used for displaying the movie's poster and backdrop path.

For more information about TMDb's API, checkout the [developers section](https://developers.themoviedb.org/3/getting-started/introduction) of their website. TMDb is a fantastic resource, and their documentation and support is pretty solid.

The backend of pieflix is coded in python, and uses Flask and SQLAlchemy to manage API calls and the interactions with the database. [Requests](https://docs.python-requests.org/en/master/user/quickstart/#make-a-request) is used to make calls to TMDb API and return lists of movies.

The following is an example of an API call to TMDb, based on the user-input of 'dominos'.

```
@pairing_routes.route('/new/<int:userId>/<pizzaPlace>')
@login_required
def pairing(userId, pizzaPlace):
    if pizzaPlace == 'dominos':
        pizza_selection = "Domino's Pizza"
        req = requests.get(f"https://api.themoviedb.org/3/discover/movie?api_key={API}&include_adult=false&with_runtime.gte=60&original_language=en&release_date.gte=01011980&certification_country=US&certification.lte=PG-13&with_genres=12")
```
The response is then converted to json, and the "results" key (which contains the list of potential movie selections) is obtained. Then we query the database for the user's previous pairings.

```
    response = req.json();
    results = response["results"];
    prev = Pairing.query.filter(Pairing.user_id == userId).all()
    prev_selections = []
```
Then we go through each of the previous pairs and add their movie titles to a list called prev_selections. Then we iterate through the titles of the movies in the potential selections, and any that are not found in the prev_selections list are then added to the possible_selections list.

```
    for pair in prev:
            prev_selections.append(pair.title)

    possible_selections = []

    for movie in results:
        if movie["title"] not in prev_selections:
            possible_selections.append(movie)
```
A random selection is then made from the possible_selections list, and a new entry in the database is created with the information from our selected movie.

```
    movie = random.choice(possible_selections);

    pairing = Pairing(
        user_id=userId,
        pizza=pizza_selection,
        title=movie["title"],
        release_date=movie["release_date"],
        genre=movie["genre_ids"],
        plot=movie["overview"],
        poster=movie["poster_path"],
        backdrop_path=movie["backdrop_path"]
    )

    db.session.add(pairing)
    db.session.commit()

    return pairing.to_dict()
```
The new pairing is then returned to the front end where it can be displayed to the user.

***

## <a name="frontend-overview"></a>Frontend Overview

On the frontend, React, Redux, and good ol' CSS display the information returned from the call. React is used for rendering component. Redux is used to manage the store, and communicates with the backend to get the information, such as user's previous pairs and the new pairing. Functions such as reviewing (thumbs up and thumbs down) and deleting previous pairings are also handled via React and Redux. Social sharing, however, implements [React-Share](https://www.npmjs.com/package/react-share).

![pieflix user profile page](https://media-exp3.licdn.com/dms/image/C5622AQGQqb3UMG7APw/feedshare-shrink_2048_1536/0/1625862936159?e=1628726400&v=beta&t=kV3WTo-P6PXcqqGUShe6y9TmPbgfyAJTzOotIycanRY)

No CSS libraries where used. Movie posters and backdrops are collected via TMDb API call.

### A Note About Conditional Rendering

Potentially one of my favorite aspects of React is conditional rendering. If you take a scroll through the code in [PairingForm.js](https://github.com/jacobleonhardt/pizza_movie_pairing_app/blob/main/react-app/src/components/pair/PairingForm.js), you'll notice a good deal of it. A great benefit of it is the ability to have two separate components exist on the same route, but choose which to display based on a condition, such as whether or not the user is logged in. This is implemented in the App.js file to determine whether or not the user should be shown the Landing component, or the User component.
```
    const user = useSelector(state => state.session.user)

    ...

    <Route path="/" exact={true} >
        {user ? <User /> : <Landing />}
    </Route>
```

Conditional rendering is also used to control the items displayed in the navigation, and whether or not to display the normal or mobile navigation.

```
function App() {

    ...

    const [onMobile, setOnMobile] = useState(false)

    ...

    // Checks for what navigation status should be on page resizing
    const checkForMobileSize = () => {
        if (window.innerWidth <= 768) {
            setOnMobile(true)
        } else {
            setOnMobile(false)
        }
    }

  useEffect(() => {

    ...

    // Sets navigation status on page load
    window.innerWidth <= 768 ? setOnMobile(true) : setOnMobile(false)

    }, [dispatch]);

    window.onresize = checkForMobileSize;

    return (
        <BrowserRouter>
            {!onMobile ? <NavBar /> : <MobileNav />}
        ...
        </BrowserRouter>
    );
```


***

## <a name="next-steps"></a>Next Steps

Pieflix was a totally fun project to build, and I hope to be able to keep refining and adding on to it later. Some ideas for future development include:
* SafeSearch feature
  ** This would add a checkbox that users can select when using Find a Film. SafeSearch will only return movies that are considered appropriate for families/young-children.
* A more advanced/in-depth Find a Film form.
  ** Form fields would be added to include not only the pizza company, but also the specific pizza you're having from that brand.
  ** Form would also include a select field for users to choose a target audience. This would be used to better expand or refine search results.

***

## <a name="contributions"></a>Contributions

If you would like to contribute to pieflix, feel free to contact me via [linkedIn](https://www.linkedin.com/in/jacob-leonhardt-b19067ba/) or [facebook](https://www.facebook.com/profile.php?id=100009183859915).
