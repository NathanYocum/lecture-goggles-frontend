import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import NavBar from './navBar';

afterEach(cleanup);

it("Doesn't render a hamburger menu by default", () => {
  const { queryByTestId } = render(<NavBar />);
  expect(queryByTestId('hamburger-button')).toBeNull();
});

it('Renders a hamburger menu when renderButton is true', () => {
  // Use a similar approach to how we expect the navbar would be used
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('hamburger-button')).not.toBeNull();
});

it("Doesn't render a hamburger button when renderButton is false", () => {
  global.innerWidth = 1080;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('hamburger-button')).toBeNull();
});

it('Renders a link to Subjects when the hamburger button is not rendered', () => {
  global.innerWidth = 1080;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('subjects-link-full')).not.toBeNull();
  expect(queryByTestId('subjects-link-full').outerHTML).toMatch(/<a .* href="\/subjects" .*>Subjects<\/a>/gm);
});

it('Renders a link to Topics when the hamburger button is not rendered', () => {
  global.innerWidth = 1080;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('topics-link-full')).not.toBeNull();
  expect(queryByTestId('topics-link-full').outerHTML).toMatch(/<a .* href="\/topics" .*>Topics<\/a>/gm);
});

it('Renders a link to Resources when the hamburger button is not rendered', () => {
  global.innerWidth = 1080;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('resources-link-full')).not.toBeNull();
  expect(queryByTestId('resources-link-full').outerHTML).toMatch(/<a .* href="\/resources" .*>Resources<\/a>/gm);
});

it('Renders a link to Support when the hamburger button is not rendered', () => {
  global.innerWidth = 1080;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('support-link-full')).not.toBeNull();
  expect(queryByTestId('support-link-full').outerHTML).toMatch(/<a .* href="\/support" .*>Support<\/a>/gm);
});

it('Renders a link to Developers when the hamburger button is not rendered', () => {
  global.innerWidth = 1080;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('developers-link-full')).not.toBeNull();
  expect(queryByTestId('developers-link-full').outerHTML).toMatch(/<a .* href="\/developers" .*>Developers<\/a>/gm);
});

// Need to modify these tests when we get the token based authentication working
it('Renders a link to Sign In when the hamburger button is not rendered', () => {
  global.innerWidth = 1080;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('sign-in-link-full')).not.toBeNull();
  expect(queryByTestId('sign-in-link-full').outerHTML).toMatch(/<a .* href="\/signIn" .*>Sign In<\/a>/gm);
});

it('Renders a link to Create An Account when the hamburger button is not rendered', () => {
  global.innerWidth = 1080;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('new-account-link-full')).not.toBeNull();
  expect(queryByTestId('new-account-link-full').outerHTML).toMatch(
    /<a .* href="\/newAccount" .*>Create an Account<\/a>/gm
  );
});

it("Doesn't render full links on mobile", () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId(/.*-full/gm)).toBeNull();
});

it('Only renders a link to Sign In when the hamburger button is rendered', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId('sign-in-link-mobile').outerHTML).toMatch(/<a .* href="\/signIn" .*>Sign In<\/a>/gm);
});

it("Doesn't render the menu without being clicked", () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  expect(queryByTestId(/.*-menu/gm)).toBeNull();
});

it('Renders a menu when the hamburger button is pressed', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/.*-menu/gm)).not.toBeNull();
});

it("Doesn't render additional links in navbar when hamburger button is pressed", () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/sign-in-link(-mobile|-full)/gm)).toBeNull();
});

it('Renders a link to Subjects when the hamburger button is pressed', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/subjects-link-menu/gm).outerHTML).toMatch(/<a .* href="\/subjects" .*>Subjects<\/a>/gm);
});

it('Renders a link to Topics when the hamburger button is pressed', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/topics-link-menu/gm).outerHTML).toMatch(/<a .* href="\/topics" .*>Topics<\/a>/gm);
});

it('Renders a link to Resources when the hamburger button is pressed', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/resources-link-menu/gm).outerHTML).toMatch(/<a .* href="\/resources" .*>Resources<\/a>/gm);
});

it('Renders a link to Support when the hamburger button is pressed', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/support-link-menu/gm).outerHTML).toMatch(/<a .* href="\/support" .*>Support<\/a>/gm);
});

it('Renders a link to Developers when the hamburger button is pressed', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/developers-link-menu/gm).outerHTML).toMatch(/<a .* href="\/developers" .*>Developers<\/a>/gm);
});

it('Renders a link to Sign In when the hamburger button is pressed', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/sign-in-link-menu/gm).outerHTML).toMatch(/<a .* href="\/signIn" .*>Sign In<\/a>/gm);
});

it('Renders a link to Create an Account when the hamburger button is pressed', () => {
  global.innerWidth = 320;
  const { queryByTestId } = render(<NavBar renderButton={window.innerWidth < 768} />);
  fireEvent.click(queryByTestId('hamburger-button'), { button: 0 });
  expect(queryByTestId(/create-an-account-link-menu/gm).outerHTML).toMatch(
    /<a .* href="\/newAccount" .*>Create an Account<\/a>/gm
  );
});
