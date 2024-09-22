import tomllib
yoro_toml = ""

# Check if tomllib is available 
# Check if jinja2 is available

with open("yoro.toml", "rb") as toml_spec:     
    yoro_toml = tomllib.load(toml_spec)

# Validate that all fields are defined


# Perform transform
with open("./tree-sitter-yoro/grammar_backup.js") as grammar_js:
    template = grammar_js.read()


keywords = yoro_toml["keywords"]
for keyword_group in keywords:
    keyword_group = keywords[keyword_group]

    print(keyword_group)


