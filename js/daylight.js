(function(){
  // do the following on sites that aren't the main domain
  if(window.location.hostname === "investors.vivintsolar.com" || window.location.hostname === "careers-vivintsolar.icims.com" ) {
    const html = document.querySelector('html');
    html.classList.add('font__serif--loaded');
    html.classList.add('font__sans--loaded');
  }
})();