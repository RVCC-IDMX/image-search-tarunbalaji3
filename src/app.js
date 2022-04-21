const form = document.querySelector('.search-form');
const postSection = document.querySelector('.container');
const postTemplate = document.querySelector('#template');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  let num = 0;

  response.results.forEach((element) => {
    const clone = postTemplate.content.cloneNode(true);
    const dataObj = response.results[num];
    const postImg = clone.querySelector('.post__img');
    const postCap = clone.querySelector('.post__user');
    const postDes = clone.querySelector('.post__desc');

    postImg.src = dataObj.urls.small;

    const author = dataObj.user.name;

    let caption = dataObj.description;

    if (caption !== null) {
      if (caption.length > 100) {
        const newString = caption.substr(0, 99);
        caption = `${newString}...`;
      }
    }

    postCap.innerText = `by ${author}`;
    postDes.innerText = caption;

    postSection.appendChild(clone);

    num++;
  });

  /*
  some sample code
    const dataObj = response.results[0];
    const postImg = clone.querySelector('.post__img');
    postImg.src = dataObj.urls.small;
    postImg.alt = dataObj.alt_description;
  */

  /*
    Loop through the results[] array. For each result, create a clone of the
    template and append it to the DOM element with the .container class.
  */

  /*
    Add an attribution statement below the image using the
    postUser element and the photographer's name from dataObj
   */

  /*
    Check the description of the post. If it's bot bull and less than 100 characters,
    add the description from dataObj to the post. If it's more than 100 characters,
    add the first 100 characters of the description from dataObj to the post followed by
    an ellipsis (...)
  */
});
