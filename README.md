TypedGate "TG" - a JSON Type Validator without schemas
======================================================

TypedGate is a validator that compares TS interface/class definition to JSON.

![TypedGate Screenshot](docs/typedgate-screenshot.png)

## Checking your TypeScript codes of Interfaces / Classes with TypedGate
### Add ControlComment to your Interface/Class definitions

In this example, control-comment `@TG:path .engine` is added to `Engine` interface.
TypedGate recognize that JSON's `engine` property should follow `Engine` interface.

```typescript
export type CylinderLayout = 'inline' | 'flat' | 'v';
export type FuelSystemKind = 'injection' | 'carburetor';
export type EngineDirection = 'longitudinal' | 'transverse';

// This is a control comment
// @TG:path .engine
export interface Engine {
  name: string
  displacement: number;
  bore: number;
  stroke: number;
  compressionRatio: number;
  turbo: boolean;
  intercooler: boolean;
  fuelSystem: FuelSystemKind;
  vvt: boolean;
  cylinderCount: number;
  rotary: boolean;
  diesel: boolean;
  cylinderLayout: CylinderLayout;
  engineDirection: EngineDirection;
  ignitionPlugName?: string;
}
```

Note that control-comments should be placed above the interface/class declaration.

TypedGate compares `Engine` interface to following json:

```json
{
  "engine": {
    "name": "1KZ",
    "displacement": 2982,
    "bore": 96,
    "stroke": 103,
    "compressionRatio": 21.2,
    "turbo": true,
    "intercooler": false,
    "fuelSystem": "injection",
    "vvt": false,
    "cylinderCount": 4,
    "rotary": false,
    "diesel": true,
    "cylinderLayout": "inline",
    "engineDirection": "longitudinal"
  }
}
```

Since this JSON has valid type of `Engine` interface, TypedGate will print following output:

```
Loading project...
Validating...
=== Validation Result ===
Valid
```

TypedGate also recognize multiple control-comment like this:

```typescript
// @TG:path .login.providers.twitter
// @TG:path .login.providers.facebook
// @TG:path .login.providers.line
export interface ProviderItem {
  displayName: string;
  isShow: boolean;
}
```

JSON shown below satisfies above interface definition.

```json
{
  "login":{
    "providers":{
      "twitter":{
        "displayName":"Twitter",
        "isShow":true
      },
      "facebook":{
        "displayName":"Facebook",
        "isShow":false
      },
      "line":{
        "displayName":"LINE",
        "isShow":true
      }
    }
  }
}
```

### Run TypedGate

To run TypedGate, you should specify path to project's tsconfig.json, path to source file, path to json to validate.

- `-t` or `--tsconfig`: path to `tsconfig.json`
- `-s` or `--src`: path to source file to validate
- `-j` or `--json`: path to json file to validate
    - Since TypedGate is not a JSON validator, JSON with wrong syntax will cause application error.
- `-v` or `--verbose`: TypedGate will print verbose outputs

```
typedgate --tsconfig ./test/fixtures/car-types/tsconfig.json --src ./test/fixtures/car-types/engine.ts --json ./test/fixtures/car-types/engine.json
```

## Development
### Run TypedGate
In `test/` directory, you can find various useful test cases to develop the TypedGate code.

```
npm run build && node dist/index.js -v --tsconfig ./test/fixtures/car-types/tsconfig.json --src ./test/fixtures/car-types/engine.ts --json ./test/fixtures/car-types/engine.json
```

`-v` (`--verbose`) switch will help your development.

### Run tests
```
npm run test
```
