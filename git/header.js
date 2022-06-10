const button = document.querySelector('#menu');

button.addEventListener('click', function () {
    this.setAttribute('aria-expanded', this.getAttribute('aria-expanded') === "true" ? "false" : "true")

})
