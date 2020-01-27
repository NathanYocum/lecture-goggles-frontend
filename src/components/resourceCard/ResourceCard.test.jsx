import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ResourceCard from './ResourceCard';

afterEach(cleanup);

/**
 * Tests for text rendering
 */
it('Renders a title', () => {
  const { getByText } = render(
    <ResourceCard
      title="A Title I Have Chosen"
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(getByText(/A Title I Have Chosen/gm)).toBeTruthy();
  expect(getByText(/A Title I Have Chosen/gm).outerHTML).toMatch(/<div.*class=".*">A Title I Have Chosen<\/div>/gm);
});

it('Renders a Subject', () => {
  const { getByText } = render(
    <ResourceCard
      title=""
      subject="Some kind of subject"
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(getByText(/Some kind of subject/gm)).toBeTruthy();
  expect(getByText(/Some kind of subject/gm).outerHTML).toMatch(
    /<div class=".*">Subject: Some kind of subject<\/div>/gm
  );
});

it('Renders a topic', () => {
  const { getByText } = render(
    <ResourceCard
      title=""
      subject=""
      topic="Some random topic"
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(getByText(/Some random topic/gm)).toBeTruthy();
  expect(getByText(/Some random topic/gm).outerHTML).toMatch(/<div class=".*">Topic: Some random topic<\/div>/gm);
});

it('Renders an author', () => {
  const { getByText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author="Jane Doe"
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(getByText(/Jane Doe/gm)).toBeTruthy();
  expect(getByText(/Jane Doe/gm).outerHTML).toMatch(/<div.*class=".*">Uploaded by Jane Doe<\/div>/gm);
});

it('Renders an image of the author with an alt image text', () => {
  const { getByAltText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author=""
      authorImg="some_url_would_be_here"
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(getByAltText(/uploader avatar/gm)).toBeTruthy();
  expect(getByAltText(/uploader avatar/gm).outerHTML).toMatch(
    /<img.*width=".*px" height=".*px" src="some_url_would_be_here" alt="uploader avatar" class=".*"/gm
  );
});

it('Renders an image of the author with an alt image text', () => {
  const { getByAltText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg="a_url_goes_here"
      points={0}
      timeStamp=""
      description=""
      url="a_link"
      id={1}
    />
  );

  expect(getByAltText(/preview/gm)).toBeTruthy();
  expect(getByAltText(/preview/gm).outerHTML).toMatch(
    /<img width=".*" height=".*" src="a_url_goes_here" alt="preview" class=".*">/gm
  );
});

it('Includes a hyperlink of the url on the image', () => {
  const { getByAltText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url="a_link"
      id={1}
    />
  );

  expect(getByAltText(/preview/gm)).toBeTruthy();
  expect(getByAltText(/preview/gm).parentElement.outerHTML).toMatch(
    /<a href="a_link" class=".*"><img width=".*" height=".*" src="" alt="preview" class=".*"><\/a>/gm
  );
});

it('Renders the url of the resource', () => {
  const { getByText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url="a_url"
      id={1}
    />
  );

  expect(getByText(/a_url/gm)).toBeTruthy();
  expect(getByText(/a_url/gm).outerHTML).toMatch(/<div class=".*">a_url<\/div>/gm);
});

it('Truncates a long url of the resource', () => {
  const url =
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
  const { getByText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url={url}
      id={1}
    />
  );

  expect(getByText(/a{34}.../gm)).toBeTruthy();
});

it('Renders the points of a post', () => {
  const { getByText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={-2}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(getByText(/-2/gm)).toBeTruthy();
  expect(getByText(/-2/gm).outerHTML).toMatch(/<div.*>-2 points<\/div>/gm);
});

it('Renders the positive points of a post', () => {
  const { getByText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={20}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(getByText(/\+20/gm)).toBeTruthy();
  expect(getByText(/\+20/gm).outerHTML).toMatch(/<div .*>\+20 points<\/div>/gm);
});

// Timestamp tests will depend on how the api and database format the data. Test tbd.

it('Renders a description of a post', () => {
  const des = 'Brief description of some post';
  const { getByText } = render(
    <ResourceCard
      title=""
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description={des}
      url=""
      id={1}
    />
  );
  expect(getByText(/Brief description of some post/gm)).toBeTruthy();
  expect(getByText(/Brief description of some post/gm).outerHTML).toMatch(
    /<div class=".*">Brief description of some post<\/div>/gm
  );
});

// For integration
it('Sends an upvote when upvote button is pressed', () => {});
it('Sends an downvote when upvote button is pressed', () => {});

// These tests will change when the resource card is finished
it('Renders an upvote button', () => {
  const { queryByTestId } = render(
    <ResourceCard
      title="resource"
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(queryByTestId('resource-upvote-arrow').outerHTML).toMatch(
    /<button data-testid="resource-upvote-arrow" class=".*"><i class="fa"><\/i><\/button>/gm
  );
});

it('Renders a downvote button', () => {
  const { queryByTestId } = render(
    <ResourceCard
      title="resource"
      subject=""
      topic=""
      author=""
      authorImg=""
      previewImg=""
      points={0}
      timeStamp=""
      description=""
      url=""
      id={1}
    />
  );

  expect(queryByTestId('resource-downvote-arrow').outerHTML).toMatch(
    /<button data-testid="resource-downvote-arrow" class=".*"><i class="fa"><\/i><\/button>/gm
  );
});
