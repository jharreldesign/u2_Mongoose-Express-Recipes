
const db = require('../db')
const { Type, Course, Recipe, Direction } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  const cruiseDish = await new Type({
    cuisine: 'Chineese'
  })

  const courseNumber = await new Course({
    course: 'Appetizer'
  })

  cruiseDish.save()
  courseNumber.save()

  const recipe = await new Recipe({
    name: 'Chicken and Brown Rice Casserole',
    ingredients: [
      {
        name: 'Boneless skinless chicken thighs',
        quantity: 2,
        measure: 'pound'
      },
      {
        name: 'Uncooked brown rice',
        quantity: 1.5,
        measure: 'cup'
      },
      {
        name: 'Chicken broth',
        quantity: 3,
        measure: 'cup'
      },
      {
        name: 'Butter',
        quantity: 3,
        measure: 'tablespoon'
      },
      {
        name: 'Carrots, sliced',
        quantity: 3,
        measure: 'cup'
      },
      {
        name: 'Salt',
        quantity: 2,
        measure: 'teaspoon'
      },
      {
        name: 'Onion powder',
        quantity: 2,
        measure: 'teaspoon'
      },
    ],
    prep_time: 20,
    cooking_time: 50,
    total_time: 80,
    servings: 8,
    calories: 412,
    dishType_id: cruiseDish._id,
    dishCourse_id: cruiseDish._id
  })
  
  recipe.save()

  const direction = [{
    direction: [
      'Preheat the oven to 365 degrees',
      'Spray the bottom of a 9x13 baking dish with non stick spray',
      'Place the rice on the bottom of the baking dish',
      'Place the chicken over the top of the rice',
      'Season the top of the chicken with all of the seasonings',
      'Pour the broth over the top.',
      'Place the carrots in between the chciken and rice',
      'Place the butter over the top',
      'Cover tightly with foil',
      'Bake for 90 minutes or until the rice is tender',
      'Remove the oven and stir. Let sit for 2 minutes and serve.'
    ],
    recipe_id: recipe._id
  }]
  await Direction.insertMany(direction)
  console.log('Direction Created!')
}

const run = async () => {
  await main()
  db.close()
}

run()
