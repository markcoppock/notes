# TAMUS Technology Summit

Day 1, 2-11-2015  

---

## LESS and SASS: Shortcuts for Creating Great CSS

John Phillips, TAMU College of Architecture and Xavier Porter, Texas A&M IT 

from the program:  

> CSS creation is hard! It’s time-consuming, confusing, and all of those rules and prefixes are sometimes hard to remember. But wait, there is a solution. This session introduces the concept of integrating CSS preprocessors into your development workflow, discusses the differences between two popular preprocessors, LESS and SASS and provides a quick intro into how using a CSS preprocessor can decrease your front-end development time.

[pres](http://bit.ly/lessandsass)   

### LESS

LESS has its own compiler (looks like codekit)  

with LESS you can put the media query inside the class (cleaner)  

easier mixin implementation  

### SCSS

Scout: a free compiler  

[mixture](http://mixture.io): a free compiler; reloads the page also  

**the `@extend` feature**  

**check mixin libraries like bourbon**  

get started: Bootstrap SASS (? or just LESS), Foundation SASS

[tamu codepen](http://codepen.io/gomobile-tamu/)  

### q&a

nest ie8 css inside modernizr  

---

## The Politics of Designing a Large University Website

Erick Beck, TAMU Marketing and Communications

from the program:  

> The most difficult part of any large web project is almost never the technology used or the actual building of the site. It is the politics that must be navigated before, during, and after other work starts. Erick Beck, Director of Web Development at TAMU’s Division of Marketing & Communications, will present observations and insights learned from his experiences in working on large-scale university web projects.
woodrow wilson (formerly pres. of Princeton): DC politics pales before acedemic politics. 

woodrow wilson (formerly pres. of Princeton): DC politics pales before acedemic politics  

---

## Continuous Integration and Testing for Web Applications

Noel Bundick and David Sweeney, TAMU Division of Student Affairs

from the program:  

> For complex development projects, much time can be spent in testing and
deployment. Issues arise and become harder to manage as the project
becomes more complex. Using continuous integration, our team has created
a process to build, test, and deploy complex applications developed by a team of developers that reduces errors and time to deployment. The process allows the team to develop faster, and with better quality, while automating most steps. This presentation will detail our continuous integration process.


[slides](http://tx.ag/doitci)

Goal of CI: AUTOMATE EVERYTHING  

see the CI Process slide  

they use .NET back end with angular font end with (karma testing)  

**.NET can be compiled to work on OSX now**  

with linux, check jenkins and travis ci

---

---

---

# Day 2 

2-12-15

---

---

---

## A Web for Everyone  

from the program:

> Have you heard something about web accessibility requirements but don’t
know where to start? Building an accessible website means going beyond
the traditional use cases and considering usability for people with disabilities. In this session, we’ll discuss the current requirements for higher education, demonstrate common barriers for users with disabilities, and talk about practical solutions to implement right now.


Kyle Boatsman, Texas A&M IT

[slides / talking points](http://kboatsman.github.io/techsummit15); starting with a **good checklist**  

[test site](http://kboatsman.github.io/aggiepedia/)  

WCAG 2.0 finally finally finally getting closer to being the official standard. **shoot for Level A and AA**   

[nvda](http://www.nvaccess.org/): a free open source screen reader  

### text for the `alt` attribute 

alt text: *totally* dependent on the context in which it is used   

use `alt=""` when the image is only there for sighted users  

[al text decision tree](http://www.4syllables.com.au/2010/12/text-alternatives-decision-tree/)—*use this*  

### forms

group related form elements with `legend` and `fieldset` tags   

use the `for` and `name` attributes for `label` and `input` tags, respectively. allows mouse users to click the name to focus its input  

add "(required)" to labels

### color

color contrasts may be the biggest accessibility issue on campus (grey on grey)  

### semantic structure 

use proper headings and tags, matters to google and screen readers  

### keyboard access

mobility impaired users (and fast users) need   

tab index values: stop using; (check)  

### ARIA

accessible rich internet apps. [**use these**](http://www.w3.org/WAI/PF/aria-practices/#aria_ex_header), but **not** if standard html elements will cover it  

e.g., `role="button" aria-label="site navigation"` (hamburger menu icon, in this case)  

aria doesn't cover keyboard navigation   

---

## TAMUS Digital Media Center of Excellence

Diane McDonald, Texas A&M University System  

from the program:

> The Texas A&M University System is exploring the opportunity to provide a dedicated Digital Center of Excellence (COE) to serve its member institutions and agencies. The Digital COE would provide a centralized “virtual resource” for the A&M System members to disseminate best practices and channel strategies. In this session, you will receive an overview of the proposed Digital COE objectives, operation, and management as well as learn about the digital media strategic priorities identified through a System-wide committee and survey.

DCOEs: so far, not at university systems  

Pepsico: started for marketing cohedsiveness adn sharing best practives thoughout the companies  

JP Morgan  

GE  

TAMUS may be piloting having a DCOE in a university system  

### purposes 

- present a unified digital experience across sites
- streamline processes for publlishing content, moderationg social, _____
- create cost efficiencies 

---

## In-House Responsive Development – A Full-Team Discussion

Daphne Hunt, Karole Schroeder, Morgan Hammond, and
Ernesto Martinez, Tarleton State University  

from the program: 

> What is involved when developing and implementing a custom responsive
design at a university? Tarleton State University’s entire web services team discusses the plans, processes, pizza orders, and pains of going responsive. This is a presentation for your entire web team - designers, programmers, content specialists and managers. Attendees can expect to learn about building a custom framework, best practices, required resources, and lessons learned.

[their timeline for the project](http://www.tiki-toki.com/timeline/entry/391564/Tarletons-Responsive-Web-Build-Timeline/)  

[site to build timelines](http://www.tiki-toki.com/)  

USE STYLE TILES  

see the excellent question list for users doing beta test  

they started with a non-CMS site, then move to Cascade  

lazylib js to load images as the user scrolls  

phone numbers marked up to dial phones on jabber/voip system   

erikrunyoh.com/highered-rwd-directory  

drastic differece between how current and prospective students use the site. 

- Current: forget the homepage, right to the search which they want to search *everything*
- prospective: they like familiar elements on the homepage (familiar pres. with the other college sites they're looking at)