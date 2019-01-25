import React from 'react';
import { render } from 'react-testing-library';
import ResourceCard from './ResourceCard';

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
    />
  );

  expect(getByText('A Title I Have Chosen')).toBeTruthy();
  expect(getByText('A Title I Have Chosen').outerHTML).toMatch(/<div class=".*">A Title I Have Chosen<\/div>/gm);
});
