if (window.history && window.history.pushState) {
  window.addEventListener('popstate', (event) => {
    var url=document.URL;
    if (url.indexOf('?') === -1) {
      url += '?async';
    } else {
      url += '&async';
    }
    document.querySelector('#content').innerHTML = 'Loading';
    fetch(url)
      .then(function (res) {
        return res.text();
      })
      .then(function (res) {
        document.querySelector('#content').innerHTML = res;
      });
  });
}
function hook(scope) {
  scope.querySelectorAll('a').forEach(function (anchor) {
    if (anchor.href.indexOf(window.location.origin) === 0) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var url = anchor.href;
        history.pushState("","",url)
        if (url.indexOf('?') === -1) {
          url += '?async';
        } else {
          url += '&async';
        }
        document.querySelector('#content').innerHTML = 'Loading';
        fetch(url)
          .then(function (res) {
            return res.text();
          })
          .then(function (res) {
            document.querySelector('#content').innerHTML = res;
            hook(document.querySelector('#content'));
          });
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  hook(document);
});
