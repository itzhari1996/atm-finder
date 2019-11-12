import React from 'react'
import {render,cleanup} from "@testing-library/react"
import "@testing-library/jest-dom"
import GetLocation from '../components/GetLocation'
import { shallow,configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()});
afterEach(cleanup)

it("renders Component correctly", ()=>{
    const {getByTestId} = render(<GetLocation/>)
    expect(getByTestId('getlocation'))
})

it("renders search correctly", ()=>{
    const {getByTestId} = render(<GetLocation/>)
    expect(getByTestId('autocomplete'))
})

it("renders search correctly", ()=>{
    const {getByTestId} = render(<GetLocation/>)
    expect(getByTestId('textdiv'))
})

it('Test click event', () => {
    const wrapper = shallow(<GetLocation/>);
    expect(()=>{wrapper.find('button').simulate('click')}).toThrow("Cannot read property 'getCurrentPosition' of undefined")
  });

