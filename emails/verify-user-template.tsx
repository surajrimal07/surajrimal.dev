import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface VerifyUserEmailTemplateProps {
  inviteLink?: string
}

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : ''

export const VerifyUserEmailTemplate = ({ inviteLink }: VerifyUserEmailTemplateProps) => {
  const previewText = `Join Andrew Sam`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/logo.png`}
                width="50"
                height="50"
                alt="Andrew Sam"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Join <strong>Andrew Sam</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello,</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Click the button below to join Andrew Sam.
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#D6EADF] px-5 py-3 text-center text-[12px] font-semibold text-black no-underline"
                href={inviteLink}
              >
                Verify Email
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:{' '}
              <Link href={inviteLink} className="text-blue-600 no-underline">
                {inviteLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              If you didn&apos;t try to login, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

VerifyUserEmailTemplate.PreviewProps = {
  inviteLink: `${baseUrl}/static/vercel-user.png`,
} as VerifyUserEmailTemplateProps

export default VerifyUserEmailTemplate
