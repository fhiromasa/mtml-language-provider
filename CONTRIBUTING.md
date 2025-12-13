# How to Contribute

## Clone

```sh
# clone parent repository
git clone https://github.com/fhiromasa/mtml-language-provider.git

# clone all submodules
git submodule update --init --recursive
```

## Set Up

## Prerequisites

- Nodejs@22.21.1
- npm

### Install Dependencies

```sh
npm install
```

## About Data

The json file in src/data was created in the [mtmlItemMaker repository](https://github.com/fhiromasa/mtmlItemMaker).
I don't use anything other than `item.ts or json` for this extension.
Since mtmlItemMaker repository is used as a submodule, it is necessary to update it with the following command.

```sh
$ git submodule update
```
