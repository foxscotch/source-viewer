# source-viewer

Used to view source files. Made in React, with [highlight.js][1] for syntax
highlighting. I wanted it so that I could make my CS50x solutions available to
be viewed by potential employers/curious peers. I didn't want to put it publicly
on GitHub, where it would be subject to their SEO and easily found by students
who were, perhaps, trying to cheat.

It can be deployed as a simple static app and served with whatever webserver
you want. Place the source files you want to view in the ./public/src directory,
then run `dir_to_json.py` on it to get your manifest file, which should be kept
under the ./public directory. You will probably want to remove any non-text
files from the manifest first, since it won't do anything meaningful with them.

You can see an instance in action at [foxscotch.net][2].

[1]: https://highlightjs.org/
[2]: https://foxscotch.net/source-viewer/
