package tree_sitter_yoro_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_yoro "github.com/tree-sitter/tree-sitter-yoro/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_yoro.Language())
	if language == nil {
		t.Errorf("Error loading Yoro grammar")
	}
}
