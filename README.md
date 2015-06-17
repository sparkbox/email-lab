#Email Lab

This a project for developing and testing email templates. It uses Grunt, a command-line build tool,
to streamline and simplify the creation of email templates. Email template can be built with re-usable
components (like header and footer) and can be styled using traditional CSS or Sass that will be compiled
into normal CSS. The build tool will convert these traditional styling rules into embedded and inlined
styles required for HTML in most email clients.

See the tools section below for more information.

##Setup and Installation

You will need the following tools installed in order to complete the setup (install notes are for Mac).

- [Node.js](http://nodejs.org) - If you are on a Mac install Node with [Homebrew](http://brew.sh/) (`brew install node`).
- [Grunt.js](http://gruntjs.com/getting-started) - For workflow automation (install with `npm install -g grunt-cli`)
- [Bundler](http://bundler.io/) - For managing Ruby Gem dependencies (install with `gem install bundler`)

Once these are installed successfully complete the following steps to setup the project (run commands from the project root directory).

1. Run the command `bundle install` to install required Ruby Gems
2. Run the command `npm install` to install required node packages
3. Copy `settings.sample.json` to `settings.json` and configure the following:
    - From email address
    - Default To email address
    - SMTP Provider settings (see a [full list of supported providers](https://github.com/andris9/nodemailer-wellknown#supported-services))

That's it! Sing and dance. The email template code is ready for development and testing.

##Grunt

Grunt is a tool for automating workflow tasks. It is configured to easily preview, test and build your templates.

- **Preview/Develop** - Run `grunt server` to launch the templates in a browser. This will also watch for file changes and update each time you save, including compiling SASS into CSS.
- **Build** - Run `grunt` or `grunt build` to compile all your code for production into the `/dist` directory.
- **Test** - Run `grunt send` to email your templates to a testing service like [Litmus](http://litmus.com/). To send just one email template use the template parameter like this `grunt send --template=order-confirmation` where the _template_ value is the basename of the template file. Use the `--to` parameter to provided a specific address to mail to (ie. `grunt send --to=me@example.com`).

##Tools

This Grunt workflow allows you to create emails like you would standard web pages, separating
your HTML from your CSS.

###Sass

Node Sass is used to compile Sass files into standard CSS. Each email template will have it's own
Sass file. Sass files are associated with specific templates simply by naming them with the same
basename as the HTML template file for the email (ie. `contact-confirmation.html` --> `contact-confirmation.scss`).

###Premailer

The [Premailer](https://github.com/dwightjack/grunt-premailer) plugin is used during builds to convert
the styles from linked stylesheets into embedded and inlined styles in the template since email
clients do not support linked stylesheets.

###Nodemailer

The [Nodemailer](https://github.com/dwightjack/grunt-nodemailer) plugin is used to send your email
templates to test email addresses for testing. You'll need to configure a nodemailer.json file
to use the SMTP service from your Gmail address or other service. See `/settings.sample.json`
for more details and a [list of supported SMTP services](https://github.com/andris9/nodemailer-wellknown#supported-services).

###Handlebars/Assemble

[Handlerbars](http://handlebarsjs.com/) and [Assemble](http://assemble.io/) are used
to dynamically build your templates with re-usable layouts. To create a new email
template simply create a new file in `src/templates/emails` with the .hbs extension.

##HTML Email Design

This project provides some standard boilerplate HTML markup and styling for emails. We recommend checking out these
other resources for additional layout templates and styling best practices:

- [HTML Email Boilerplate](https://github.com/seanpowell/Email-Boilerplate) - Well-documented boilerplate template 
- [Mailchimp Email Blueprints](https://github.com/mailchimp/Email-Blueprints) - Lots of template for various layouts, including responsive template
- [Mailchimp Email Design Reference](http://templates.mailchimp.com/) - Great reference guide for designing HTML emails
- [Email Client Market Share](http://emailclientmarketshare.com/) - List of the most popular email clients

##Todo

- Create Yeoman generator that configures options, sets up Nodemailer and generates new email templates
- Handle images locally during dev, but replace with hosted images for testing
