# Automatically build library from src/ into lib/
guard 'coffeescript', all_on_start: true, input: 'src', output: 'lib'

# Also build Coffeescript spec files in test/
guard 'coffeescript', input: 'spec', output: 'spec', bare: true

# Rebuild library documentation with Docco on changes
guard 'process', name: 'Docco', dont_stop: true, command: 'bundle exec docco src/instajam.coffee' do
  watch %r{src/.+\.coffee}
end

# Rename documentation file so that it's an index page
guard 'process', name: 'Rename documentation', command: 'mv docs/instajam.html docs/index.html' do
  watch %r{docs/instajam.html}
end

# Duplicate the compiled library to prepare for minification
guard 'process', name: 'Copy to min', command: 'cp lib/instajam.js lib/instajam.min.js' do 
  watch %r{lib/instajam.js}
end

# Minify the library via uglify.js
guard 'uglify', destination_file: 'lib/instajam.min.js' do
  watch %r{lib/instajam.min.js}
end

# Reload test runner when specs or the library change
guard 'livereload' do
  watch %r{spec/.+\.js}
  watch %r{lib/instajam.js}
  watch %r{test/.+\.html}
end