import { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) => {
  return S.list()
    .title('MaxCash CMS')
    .items([
      // User Management Group
      S.listItem()
        .title('User Management')
        .child(
          S.list()
            .title('User Management')
            .items([
              S.documentTypeListItem('user').title('Users'),
              S.documentTypeListItem('customer').title('Customers'),
              S.documentTypeListItem('teamMember').title('Team Members'),
            ])
        ),
      
      // Content Group
      S.listItem()
        .title('Content')
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('page').title('Pages'),
              S.documentTypeListItem('post').title('Blog Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
              S.documentTypeListItem('announcement').title('Announcements'),
            ])
        ),
      
      // Products Group
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Products')
            .items([
              S.documentTypeListItem('loanProduct').title('Loan Products'),
            ])
        ),
      
      // Help Center Group
      S.listItem()
        .title('Help Center')
        .child(
          S.list()
            .title('Help Center')
            .items([
              S.documentTypeListItem('article').title('Help Articles'),
              S.documentTypeListItem('helpCategory').title('Help Categories'),
            ])
        ),
      
      // Legal Group
      S.listItem()
        .title('Legal')
        .child(
          S.list()
            .title('Legal')
            .items([
              S.documentTypeListItem('termsOfService').title('Terms of Service'),
              S.documentTypeListItem('privacyPolicy').title('Privacy Policy'),
              S.documentTypeListItem('kycPolicy').title('KYC Policy'),
              S.documentTypeListItem('amlPolicy').title('AML Policy'),
              S.documentTypeListItem('loanAgreement').title('Loan Agreement'),
              S.documentTypeListItem('userAgreement').title('User Agreement'),
            ])
        ),
      
      // Compliance Group
      S.listItem()
        .title('Compliance')
        .child(
          S.list()
            .title('Compliance')
            .items([
              S.documentTypeListItem('compliancePolicy').title('Compliance Policies'),
            ])
        ),
      
      // Communications Group
      S.listItem()
        .title('Communications')
        .child(
          S.list()
            .title('Communications')
            .items([
              S.documentTypeListItem('faq').title('FAQs'),
              S.documentTypeListItem('emailTemplate').title('Email Templates'),
              S.documentTypeListItem('notification').title('Notifications'),
            ])
        ),
      
      // Settings Group (with singletons)
      S.listItem()
        .title('Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.documentTypeListItem('siteSettings').title('Site Settings'),
              S.documentTypeListItem('seoSettings').title('SEO Settings'),
            ])
        ),
    ])
}
