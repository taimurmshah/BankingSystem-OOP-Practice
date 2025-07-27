#!/bin/bash

# Check if test name argument is provided
if [ -z "$1" ]; then
    echo "Usage: bash run_single_test.sh \"<test_case_name>\""
    echo ""
    echo "Example test names:"
    echo "  \"Test level 1 case 01 basic create\""
    echo "  \"Test level 1 case 02 basic create and deposit\""
    echo "  \"level 1 case 01\""
    echo ""
    echo "Note: You can use partial matches - the script will find tests containing your search term"
    exit 1
fi

echo "> npx mocha specs --colors -g \"$1\""
npx mocha specs --colors -g "$1"
