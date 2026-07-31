const { db, User, Application, Interview } = require('./models')

const seed = async () => {
  try {
    await db.sync({ force: true })

    const jane = await User.create({ email: 'jane@example.com', name: 'Jane Doe' })
    const sam = await User.create({ email: 'sam@example.com', name: 'Sam Lee' })

    const app1 = await Application.create({
      userId: jane.id,
      companyName: 'Acme Corp',
      jobTitle: 'Frontend Engineer',
      status: 'applied',
    })

    const app2 = await Application.create({
      userId: jane.id,
      companyName: 'Globex',
      jobTitle: 'Backend Engineer',
      status: 'phone_screen',
    })

    const app3 = await Application.create({
      userId: jane.id,
      companyName: 'Initech',
      jobTitle: 'Full Stack Developer',
      status: 'interview',
    })

    await Application.create({
      userId: sam.id,
      companyName: 'Umbrella Inc',
      jobTitle: 'Product Manager',
      status: 'wishlist',
    })

    const app5 = await Application.create({
      userId: sam.id,
      companyName: 'Wayne Enterprises',
      jobTitle: 'DevOps Engineer',
      status: 'offer',
    })

    await Application.create({
      userId: sam.id,
      companyName: 'Stark Industries',
      jobTitle: 'Data Engineer',
      status: 'rejected',
    })

    await Interview.create({
      applicationId: app2.id,
      interviewDate: new Date('2026-07-05'),
      interviewType: 'phone',
    })

    await Interview.create({
      applicationId: app3.id,
      interviewDate: new Date('2026-07-10'),
      interviewType: 'technical',
    })

    await Interview.create({
      applicationId: app3.id,
      interviewDate: new Date('2026-07-17'),
      interviewType: 'onsite',
    })

    await Interview.create({
      applicationId: app5.id,
      interviewDate: new Date('2026-06-20'),
      interviewType: 'final',
      feedback: 'Great culture fit, moving to offer.',
    })

    console.log('Seed complete')
    process.exit(0)
  } catch (err) {
    console.error('Seed failed:', err)
    process.exit(1)
  }
}

seed()