import React from 'react'
import {render,cleanup} from "@testing-library/react"
import SearchLocation from '../components/SearchLocation'
import "@testing-library/jest-dom"

it("renders search correctly", ()=>{
    const {getByTestId} = render(<SearchLocation/>)
    expect(getByTestId('autocomplete'))
})