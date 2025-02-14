#!/usr/bin/env bash

set -eu

cargo +nightly contract build --manifest-path offline/Cargo.toml
cargo +nightly build --manifest-path primitives/Cargo.toml
cargo +nightly contract build --manifest-path stub/Cargo.toml
cargo +nightly contract build