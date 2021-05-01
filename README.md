![cse-theme preview](/img/banner.png)

# Jekyll theme for lecture notes <!-- omit in toc -->

This Jekyll theme was devloped for one of my courses (web technology), you can view the course (and thus this theme) [here](https://chauff.github.io/Web-Teaching/). Jekyll is a static site generator that can be used to customize ones' GitHub Pages. The themes is set up with code-heavy teaching materials in mind.

This Jekyll theme is built on top of [Minima](https://github.com/jekyll/minima), Jekyll's default theme. Only the necessary files were kept, the rest was stripped from the repo.

It should be possible to develop the lecture materials entirely in markdown, without regard for the `cse-theme`.

**Spoilers**, **highlighting**, **note-taking** and **timing of active reading** are built into the theme. All information is stored in the browser's localStorage.

Your repo should have the following files and folders in the root folder:
- folders: `_lectures`, `_practicals`, `_extras`
- files: `index.md`, `404.html`, `_config.yml`

**Important: when you make changes to the configuration file (e.g. trying out a new header image) it may look like these changes are not reflected on your site, even a few minutes after updating the configurations on GitHub. If you experience this, try to open the site in a private browser window! Depending on the browser, agressive caching may be employed and although the css/image/js files have changed on the server, the browser simply looks up cached versions of these files.**

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Customization happens via settings in `_config.yml`](#customization-happens-via-settings-in-_configyml)
  - [Course title and tagline](#course-title-and-tagline)
  - [Color themes](#color-themes)
  - [Code color theme](#code-color-theme)
  - [Header image](#header-image)
  - [Footer image](#footer-image)
  - [Warning](#warning)
  - [Exam](#exam)
  - [Small navigation bar](#small-navigation-bar)
  - [Time spent (or: active reading)](#time-spent-or-active-reading)
- [Responsiveness](#responsiveness)
- [Course content](#course-content)
  - [Course information](#course-information)
  - [Adding a lecture](#adding-a-lecture)
  - [Adding practicals](#adding-practicals)
  - [Figure captions, spoilers and questions](#figure-captions-spoilers-and-questions)
- [Other information](#other-information)
  - [Adding additional (analytics) scripts/content](#adding-additional-analytics-scriptscontent)
  - [CSS split](#css-split)
  - [How to develop the theme further](#how-to-develop-the-theme-further)
  - [Misc](#misc)

## Installation

This repository does not have to be forked or cloned. It can be used as [remote theme](https://github.blog/2017-11-29-use-any-theme-with-github-pages/). All that is needed in the repository to apply the theme to is to copy [_config.yml](_config.yml) and [404.html](404.html) to your repository's root directory and add the following two lines to `_config.yml`:

```
baseurl: "/your-repository-name/"
remote_theme: chauff/cse-theme
```

The `baseurl` is used to set the root of the website (minus the hostname). The `remote_theme` has the format `GITHUBUSERNAME/REPO` and should be left as-is, unless the `cse-theme` repo was forked. That's it. Once the `_config.yml` file is added to the repository of choice this Jekyll theme will apply to it. 

## Customization happens via settings in `_config.yml`

This section walks through the site-wide options that can be set in the `_config.yml` file.

### Course title and tagline

The browser (tab) title is set via `tabTitle`.

Three taglines can be set, which differ in size/coloring and whether they are animated. 
- `line1Title`: e.g. the course code (not animated)
- `line2Title`: e.g. what this course is about in 1-2 terms (not animated; first letter of each term is given a different highlight)
- `line3Title`: e.g. what this course is about in more detail (this line is animated and appears being *typed out* one letter at a time - unless you view the transcript in Safari which doesn't implement this particular CSS feature)

You can also opt to not set one or more of the titles, in this case remove the variable from `_config.yml`.

![cse-theme preview](/img/screenshot-title.png)


### Color themes

Set the color theme (`cssTheme`), either `light-blue`, `light-green`, `light-grey`, `light-pink`, `light-red`, `dark-pink`, `dark-red` or `dark-blue`.

![cse-theme preview](/img/screenshot-light-red.png)

![cse-theme preview](/img/screenshot-light-blue.png)

![cse-theme preview](/img/screenshot-light-pink.png)

![cse-theme preview](/img/screenshot-light-green.png)

![cse-theme preview](/img/screenshot-light-grey.png)

![cse-theme preview](/img/screenshot-dark-pink.png)

![cse-theme preview](/img/screenshot-dark-blue.png)

![cse-theme preview](/img/screenshot-dark-red.png)

### Code color theme

Set the code color theme (`cssCodeTheme`), prepackaged are `monokai`, `dracula` (both have a dark background color) and `perldoc` (light background color).

![cse-theme preview](/img/screenshot-code-monokai.png)

![cse-theme preview](/img/screenshot-code-dracula.png)

![cse-theme preview](/img/screenshot-code-perldoc.png)

### Header image

Set the header image (`headerImage`). Included already are two variants,  `../images/tudelft_ewi.jpg` shows TU Delft's iconic EWI building and `../images/tudelft_ewi_bw.jpg` is its grayscale variant.

**Important**: if you are using your own header image, the easiest option is to use an absolute URL (starting with `http://` or `https://`). If you are using a relative URL, you need to keep track of the folder structure: for instance, you may want to create a folder `images` in your repository and add your header/footer images there. Then, `headerImage` should be set to `../../images/your-image.png` as per the theme, the CSS file that contains the rule to load the header image is in `assets/css/skin.css`. Thus, two directories have to be traversed to reach a directory that is in your repository's root folder.

The best way to figure out what went wrong with your relative URL setting is to use your browser's *Inspect element* option to determine the absolute path that was derived from your relative URL. Below is a screenshot of what to look out for (using Firefox) when inspecting the `<header>` holding the background image:

![cse-theme preview](/img/screenshot-inspector.png)


### Footer image

Set the footer image (`footerImage`). Included already is a typical Dutch scene ([by day](assets/images/tudelft-ewi-light-footer.svg) and [by night](assets/images/tudelft-ewi-dark-footer.svg)). The imagery has been created by [David Maxwell](https://www.dmax.org.uk/)!

The daytime image goes well with a light theme:

![cse-theme preview](/img/screenshot-light-footer.png)

The night-time image goes well with a dark theme:

![cse-theme preview](/img/screenshot-dark-footer.png)

**Important: the note above about absolute vs. relative URLs holds here as well.**

### Warning

Decide whether to show a warning of some type. If yes, set the `warning` string. This is one *global* warning string for the site. Whether or not a particular page shows the warning is determined by setting `warning: true` in each individual page's front matter (explained below in more detail). My standard use case is the updating of lecture materials throughout the year. Each page that has not been updated yet for the new year contains the warning. The warning appears just above the start of the page's content:

![cse-theme preview](/img/screenshot-warning.png)

### Exam

During the exam, you may want to remove access to the lecture materials without setting the GitHub repo to private. If the setting `exam: false` is changed to `exam: true`, a JavaScript snippet is triggered which places an opaque `<div>` across the entire viewport with the text *Exam time*. Note though that this can easily be circumvented by disabling JavaScript ... it is not more than a reminder that the lecture materials should not be accessed. It typically takes 2-3 minutes for this change in the configuration file to take effect when reloading the page (as on GitHub's end the page is rebuilt).

![cse-theme preview](/img/screenshot-exam.png)

### Small navigation bar

If a transcript is very long, switching to the next transcript can require a lot of scrolling (to scroll up and view the navigation bar again). For this reason the setting `smallNavbar: true` adds a small icon at the bottom left of the screen that pops up a small semi-transparent navigation pane when hovering over the icon with the mouse. It has the same structure/content as the original navigation bar. 

The screenshots above were all made with the setting `smallNavbar: false`. 

Here is how the icon looks like when the mouse does not hover over it:

![cse-theme small navigation bar](/img/screenshot-smallnav1.png)

And here is the mouse hovering over the icon:

![cse-theme small navigation bar](/img/screenshot-smallnav2.png)

### Time spent (or: active reading)

In order to provide some feedback on the amount of time spent on each transcript, the following setting is available:

```
timeSpent: true
idleTimeout: 60
```

If `timeSpent: true` is set, a second icon appears next to the small navigation icon with a clock (as seen in the two screenshots above). Hovering over it reveals the amount of time spent on the particular page:

![cse-theme small time spent](/img/screenshot-timespent.png)

The `idleTimeout` setting is the number of seconds of idling that is required for the timer to stop. By default, this is 60 seconds. Idling occurs when (1) the page is not in focus or (2) the page is in focus but no mouse/keyboard/scroll activity is detected. 

*This is only a crude approximation of time spent on each transcript of course. It provides nothing more than an indication.*

The timer information is stored in the browser's localStorage.

## Responsiveness

The design has basic responsiveness, it looks decent across large screens, tablets and phones.

![cse-theme preview](/img/screenshot-mobile.png)


## Course content

This section describes how to set up the course content for this specific theme. Instead of starting from scratch, you can copy the respective files and folders from here: they have been included to make development of the theme easier.

### Course information

The course information (overview, instructors, grading, etc.) should all be contained in `index.md`.

### Adding a lecture

Place the lectures (each one in a separate markdown file) in the `_lectures` folder and add the [YAML front matter](https://jekyllrb.com/docs/front-matter/) at the top of each file, separated by tripple dashes:

```yaml
---
layout: default
permalink: /http/
linkname: HTTP
ordering: 4
warning: true
---

OTHER CONTENT
```

The `layout` variable is always `default` in our case (other Jekyll themes may have different types of pages depending on the content type). 

The `permalink` variable beautifies the URL (instead of just going with the filename, which may be rather ugly) and the `linkname` variable determines how the link appears in the navigation bar of the site. 

As lectures are typically in a specific order, the `ordering` variable (just use integers, ascending order) determines the order of the lectures. Without this explicit ordering, the links would show up in alphabetic order. 

Lastly, setting the `warning` variable to `true` ensures that there will be a warning box shown at the top of the page (removing the variable or another setting yields no warning box). The warning string itself should be set in `_config.yml`. Note that the `div` sizing and resizing based on the viewport size was **hardcoded** based on my typical update warning string -- significantly longer/shorter update strings may look odd or even overflow the `div`. 

Note: all content appearing after the front matter is pushed into the `content` attribute, accessed as `{{content}}` in `default.html`.

### Adding practicals

Practicals (assignments, exercises, old exams, etc.) are added to the `_practicals` folder. The front matter is the same as for the lectures.

### Figure captions, spoilers and questions

There is no special tag for **figure captions** in Markdown. The current regime is to use `<sup>My caption.</sup>` (note the extra empty line) :point_down::

```markdown
![caniuse indexedb](/img/caniuse-indexedb.png)

<sup>Screenshot taken on September 3, 2020.</sup>
```

The result looks like this:

![screenshot caption](/img/screenshot-caption.png)

**Spoilers** (text that should onl be visible once the mouse hovers over it) can be added with a bit of HTML :point_down::

```html
<span class="spoiler">Besides a little broken image icon not much is happening.</span>
```

The result looks like this:

![screenshot caption](/img/screenshot-spoiler.png)

To add a set of **questions/answers** (e.g. at the end of a transcript as self-check questions), the `<details>`/`<summary>` tag combination works well :point_down::

```html
<details> 
  <summary>What does JavaScript's hoisting principle refer to?</summary>
  Declarations are processed before any code is executed.
</details>
```
![screenshot summary](/img/screenshot-summary.png)

*Note that the `<details>` tag does clash at the moment with how markdown handles code snippets. Ccode snippets are marked by backticks and rendered in a specific way; inside the `<details>` tag though this does not happen, the text is treated as normal text. A workaround is to place the code snippet to ask questions about right before the `<details>` tag.*

## Other information

The following sections are not necessary to know, but they may be useful if you want to develop the theme further or do a bit more than just adding transcripts.

### Adding additional (analytics) scripts/content

To track for instance site visits, add a folder `_extras`: any file in this folder will be included right before the `</body>` tag in the default layout page. For the file content to be included, the file needs to start with an empty frontmatter. As an example, the [statcounter](https://statcounter.com/) snippet (which allows you to track site visits once you set up your own account) looks as follows:

```yaml
---
---
<!-- Default Statcounter code  -->
  <script type="text/javascript">
    var sc_project = xxx;
    var sc_invisible = 1;
    var sc_security = "xxx"; 
  </script>
  <script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script>
  <!-- End of Statcounter Code -->
```

### CSS split

The CSS is split across a number of files:

- `/assets/css/skin.css` contains the CSS for the layout of the entire page (CSS grid) and the header, navbar and footer.
- `/assets/css/github-markdown.css` contains the CSS for the layout of the lectures/exercises, etc. The CSS comes from [sindresorhus](https://github.com/sindresorhus/github-markdown-css) (with slight adaptations).
- `/assets/css/text-highlighting.css` contains the CSS for the highlighting and note-taking features.

The color themes reside in `/assets/css/themes/`. To change the theme, go to `_config.yml` and change the `cssTheme` variable. The color theme of the page is separate from the color theme of the code snippets: these themes reside in `/assets/css/themes/code`. Change `cssCodeTheme` in `_config.yml` if you want to switch to another code highlighter. Code highlighter CSS files have to be compatible with [pygments](https://github.com/pygments/pygments).

### How to develop the theme further

Clone this repository and in the root folder run `bundle exec jekyll serve --watch`. The `watch` flag ensures that the Jekyll site is rebuilt when a file changes. The console output should look something like this:

```
Configuration file: /Users/claudia/GitHub/cse-theme/_config.yml
            Source: /Users/claudia/GitHub/cse-theme
       Destination: /Users/claudia/GitHub/cse-theme/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
                    done in 1.001 seconds.
 Auto-regeneration: enabled for '/Users/claudia/GitHub/cse-theme'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

The **server address** tells you which URL to open to view the theme in action.

*Note, that changing the `_config.yml` file (e.g. to switch to a different css theme) requires a restart of the server.*

### Misc

GitHub Pages does not run the latest Jekyll version, make sure to check the right Jekyll version when looking at the documentation. GitHub's Jekyll version can be found [here](https://pages.github.com/versions/). For example, the very useful `sort_by` is a Jekyll 4 feature.

If you made changes to the configuration but don't see them reflected on the served pages, clear the browser's cache or try the private mode (Firefox likes caching a lot ...).

The table of contents for each transcript can be easily generated with VS Code's [Markdown all in one](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) extension. In general, writing your Markdown in VSC is a nice way of doing things!

