function loadExtras() {
    navbar = `
<nav class="navbar navbar-expand-md fixed-top navbar-dark" style="background-color: #cc1af0;">
    <!-- Brand -->
    <!-- REPLACE THIS WITH THE VERSION OF THE LOGO I ASKED HUGH TO GET MADE -->
    <a class="navbar-brand" href="#"><img style="max-height: 40px;" src="paralogo.png"></a>
  
    <!-- Toggler/collapsibe Button -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
  
    <!-- Navbar links -->
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2" id="collapsibleNavbar">
        <ul class="navbar-nav ml-auto d-none d-sm-block">
            <li class="nav-item d-none d-sm-inline-block">
                <a class="nav-link" href="#about"><b>About</b></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a class="nav-link" href="#competitions"><b>Competitions</b></a>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <a class="nav-link" href="#contact"><b>Contact</b></a>
            </li>
        </ul>
        <div class="d-block d-sm-none">
        <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link" href="#about-m"><b>About</b></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#competitions-m"><b>Competitions</b></a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#contact-m"><b>Contact</b></a>
        </li>
    </ul>
        </div>
    </div>
</nav>
`;

    footer = `
<footer style="min-height: 20px; background-color: #ffffff; width: 100%; padding-top: 5px; padding-bottom: 5px;">
    <div class="container">
        <a href="https://www.crgs.co.uk"><img src="crgs.png" style="max-width: 5vw"></a>
        <div style="display: inline-block; margin-left: 10px;">Website by George Robertson</div>
    </div>
</footer>
`;
    navbarClass = "rwNavbar";
    footerClass = "rwFooter";

    navbarElements = document.getElementsByClassName(navbarClass);
    footerElements = document.getElementsByClassName(footerClass);
    for (i = 0; i < navbarElements.length; i++) navbarElements[i].innerHTML = navbar;
    for (i = 0; i < footerElements.length; i++) footerElements[i].innerHTML = footer;
}