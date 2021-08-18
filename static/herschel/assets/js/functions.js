( function( window, document ) {
  
  const html         = document.querySelector( 'html' )
  const siteHeader   = html.querySelector( '.site-header' )
  const socialBar    = html.querySelector( '.social-bar' )
  const scrollToTop  = html.querySelector( '#scroll-to-top' )
  const alignfull   = html.querySelectorAll( '.alignfull' )
  
  // Replace no-js class with js on html element
  html.classList.remove( 'no-js' )
  html.classList.add( 'js' )

  function setSocialBarPadding() {
    const distance = Math.floor( siteHeader.offsetHeight - window.scrollY ) + 4

    socialBar.style.paddingBlockStart =
      window.outerWidth < 1024 ? '0px' : (distance > 16 ? distance : 16) + 'px';
  }

  // Full alignment
  const scrollBarWidth = window.innerWidth - document.body.clientWidth
  for ( const element of alignfull ) {
    element.style.width      = `calc(100vw - ${scrollBarWidth}px)`
    element.style.marginLeft = `calc(50% - 50vw + ${scrollBarWidth / 2}px)`
  }

  setSocialBarPadding()

  window.addEventListener( 'scroll', function() {
    scrollToTop.style.bottom = window.scrollY > 500 ? '1em' : '-2000px'
    setSocialBarPadding()
  } )

  window.addEventListener( 'resize', function() {
    setSocialBarPadding()
  })

  scrollToTop.addEventListener( 'click', function(event) {
    event.preventDefault()
    window.scrollTo( { top: 0, behavior: 'smooth' } )
  } )

} ) ( typeof window != 'undefined' ? window : this, document )