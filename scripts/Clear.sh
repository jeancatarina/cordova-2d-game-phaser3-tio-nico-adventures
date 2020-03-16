#!/bin/bash

echo "rm -rf ios/build..."
rm -rf ios/build

echo "rm -rf android/app/build..."
rm -rf android/app/build

echo "Removed all Xcode derived data..."
rm -rf ~/Library/Developer/Xcode/DerivedData

echo "rm -rf lib... (for Flow)"
rm -rf lib

echo "rm -rf node_modules..."
rm -rf node_modules

echo "yarn install..."
yarn install