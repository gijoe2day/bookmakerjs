//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e) {
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
}

  var bookmark = {
    name: siteName,
    url: siteUrl,
  };

  //test if bookmark is null
  if (localStorage.getItem('bookmarks') === null) {
    //init array
    var bookmarks = [];

    //add to array
    bookmarks.push(bookmark);

    // set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //re-set local localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }

  //re-fetch bookmarks
  fetchBookmarks();
/*
  // local storage test
  localStorage.setItem('test', 'hello World');
  console.log(localStorage.getItem('test'));
*/

  //prevent default
  e.preventDefault();

}

//delete bookmark
function deleteBookmark(url) {
  //get bookmark from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // remove from array
      bookmarks.splice(i, 1);
    }
  }
  //re-set local localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //re-fetch bookmarks
  fetchBookmarks();
}

// fetch bookmarks
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //get output id
  var bookmarksResult = document.getElementById('bookmarksresult');

  //build output
  bookmarksResult.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResult.innerHTML +=
            '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-primary" href="' + url + '">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#"> Delete</a> ' +
            '</h3>' +
            '</div>';
  }
}

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please firll in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Please use valid url');
    return false;
  }

  return true;

}
