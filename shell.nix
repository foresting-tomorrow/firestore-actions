{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    packages = with pkgs; [
        nodejs
        nodePackages.typescript
        nodePackages.typescript-language-server
        nodePackages.yaml-language-server
        just
    ];
}
