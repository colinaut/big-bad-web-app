---
message: |

    hygen {bold component new} --name {bold NAME} {italic [--stateful or --s]} {italic [--functional or --s]} {italic [--class or --c]} {italic [--pure or --p]}

    Generates a React component, index export file, a storybook, CSS Module file, and a test.

       NAME               The component name in kebab-case ({bold required}).
       --class, --c       Generate a class-based component
       --functional --f   Generate a functional component
       --stateful, --s    Generate a stateful functional component with useState
       --pure, --p             Generate a pure component

    If no flags given, will generate a very barebones component


    Requires {bold storybook} to be installed and initialized:
        {gray $ npm i -g @storybook/cli && getstorybook}

    Requires {bold react-test-renderer} to be installed:
        {gray $ yarn add --dev react-test-renderer}
---