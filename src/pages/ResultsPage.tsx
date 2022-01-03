import React from 'react'
import WideVideo, { LoadingWideVideo } from '../components/WideVideo'
import { Container } from '@chakra-ui/react'

const ResultsPage = () => (
  <>
    <Container maxW="container.lg">
      <WideVideo
        url=""
        uploaderUrl="/channel/whocares"
        title="Lorem ipsum something something something epic thing something something epic thing something something epic thing something something epic"
        description="Lorem ipsum something something something epic Lorem ipsum Lorem ipsum something something something epic Lorem ipsum Lorem ipsum something something something epic Lorem ipsum Lorem ipsum something something something epic Lorem ipsum Lorem ipsum something something something epic Lorem ipsum"
        thumbnail="https://proxy.piped.silkky.cloud/vi/ekaIEZHJXd4/hqdefault.jpg?sqp=-oaymwEbCNIBEHZIVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAVegiCZvHiS0ypgA76jJzyJhrtYA&host=i.ytimg.com"
        uploadedDate="1 day ago"
        duration={210}
        views={2000}
        uploaderAvatar="https://proxy.piped.silkky.cloud/ytc/AKedOLR5EjzpxuHeFjUz-9oEwFFkXjhzxXlVu4n7uAm5-A=s68-c-k-c0x00ffffff-no-rw?host=yt3.ggpht.com"
        uploaderName="Person and or thing"
        uploaderVerified={true}
      />
      <br />
      <LoadingWideVideo />
    </Container>
  </>
)

export default ResultsPage
