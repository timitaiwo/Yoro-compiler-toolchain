{
  description = "Yọrọ compiler toolchain";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        # LLVM with the libraries you need
        llvm = pkgs.llvmPackages_19.llvm;
        clang = pkgs.llvmPackages_19.clang;
        lld = pkgs.llvmPackages_19.lld;
        lldb = pkgs.llvmPackages_19.lldb;
      in
      {
        devShells.default = pkgs.mkShell {
          name = "yoro-dev-shell";

          buildInputs = [
            # Build system
            pkgs.cmake
            pkgs.ninja
            pkgs.libffi
            pkgs.libxml2

            # NodeJS
            pkgs.nodejs

            # LLVM toolchain
            llvm
            clang
            lld
            lldb

            # Libraries
            pkgs.libedit
            pkgs.zstd
            pkgs.curl
          ];

          # Ensure the shell knows where to find LLVM
          shellHook = ''
            echo "🔧 Yọrọ development environment loaded!"
            echo "   CMake:   $(cmake --version | head -1)"
            echo "   Ninja:   $(ninja --version)"
            echo "   Node.js: $(node --version)"
            echo "   LLVM:    $(llvm-config --version)"
          '';

          # Help CMake find libraries
          CMAKE_PREFIX_PATH = "${llvm}/lib/cmake/llvm";
        };
      }
    );
}