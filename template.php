<?php
/**
 * @file
 * Windup starter theme template.php
 *
 * Contains preprocessing, processing, and anything else you might need to do.
 */

/**
 * Override or insert variables into the html template.
 *
 * @param array $variables
 *   An array of variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered. This is usually "html," but can
 *   also be "maintenance_page" since windup_preprocess_maintenance_page()
 *   calls this function to have consistent variables.
 */
function windup_preprocess_html(&$variables, $hook) {
  // Attributes for html element.
  $variables['html_attributes_array'] = array(
    'lang' => $variables['language']->language,
    'dir' => $variables['language']->dir,
  );

  // Send X-UA-Compatible HTTP header to force IE to use the most recent
  // rendering engine.
  // This also prevents the IE compatibility mode button appearing when using
  // conditional classes on the html tag.
  if (drupal_get_http_header('X-UA-Compatible') === NULL) {
    drupal_add_http_header('X-UA-Compatible', 'IE=edge');
  }

  // Return early so the maintenance page does not call any code we write below.
  if ($hook != 'html') {
    return;
  }
}

/**
 * Override or insert variables into the html template.
 *
 * @param array $variables
 *   An array of variables to pass to the theme template.
 * @param string $hook
 *   The name of the template being rendered. ("html" in this case.)
 */
function windup_process_html(&$variables, $hook) {
  $variables['html_attributes'] = drupal_attributes($variables['html_attributes_array']);
}

/**
 * Overrides template_preprocess_entity().
 *
 * This is only for entities created through Entity API.
 */
function windup_preprocess_entity(&$variables) {
  $entity = $variables['elements']['#entity'];
  $entity_type = $variables['elements']['#entity_type'];
  list(, , $bundle) = entity_extract_ids($entity_type, $entity);

  $variables['theme_hook_suggestions'] = _windup_default_template_suggestions($variables);

  $variables['classes_array'][] = drupal_html_class($entity_type);
  $variables['classes_array'][] = drupal_html_class($entity_type . '-' . $variables['id']);
  $variables['classes_array'][] = drupal_html_class('type-' . $bundle);
  $variables['classes_array'][] = drupal_html_class('view-mode-' . $variables['view_mode']);
}

/**
 * Implements hook_preprocess_node().
 */
function windup_preprocess_node(&$variables) {
  // Add an 'unpublished' variable.
  $variables['unpublished'] = (!$variables['status']) ? TRUE : FALSE;

  $variables['theme_hook_suggestions'] = _windup_default_template_suggestions($variables);

  $variables['classes_array'][] = drupal_html_class('type-' . $variables['type']);
  $variables['classes_array'][] = drupal_html_class('view-mode-' . $variables['view_mode']);

  // Remove unwanted classes.
  $default_classes = array(
    'node-' . $variables['type'],
    'node-promoted',
    'node-sticky',
    'node-unpublished',
    'node-teaser',
    'node-preview'
  );

  _windup_remove_classes($default_classes, $variables);

  if ($variables['promote']) {
    $variables['classes_array'][] = 'status-promoted';
  }
  if ($variables['sticky']) {
    $variables['classes_array'][] = 'status-sticky';
  }
  if (!$variables['status']) {
    $variables['classes_array'][] = 'status-unpublished';
  }
  if (isset($variables['preview'])) {
    $variables['classes_array'][] = 'status-preview';
  }
}

/**
 * Implements hook_preprocess_taxonomy_term().
 */
function windup_preprocess_taxonomy_term(&$variables) {
  $variables['theme_hook_suggestions'] = _windup_default_template_suggestions($variables);

  $variables['classes_array'][] = drupal_html_class('taxonomy_term-' . $variables['id']);
  $variables['classes_array'][] = drupal_html_class('type-taxonomy_term');
  $variables['classes_array'][] = drupal_html_class('view-mode-' . $variables['view_mode']);
}

/**
 * Implements hook_preprocess_user_profile().
 */
function windup_preprocess_user_profile(&$variables) {
  $variables['theme_hook_suggestions'] = _windup_default_template_suggestions($variables, 'user_profile');

  _windup_remove_classes(array('user-profile'), $variables);

  $variables['classes_array'][] = drupal_html_class('user');
  $variables['classes_array'][] = drupal_html_class('user-' . $variables['id']);
  $variables['classes_array'][] = drupal_html_class('type-user');
  $variables['classes_array'][] = drupal_html_class('view-mode-' . $variables['elements']['#view_mode']);
}

/**
 * Implements hook_preprocess_comment().
 */
function windup_preprocess_comment(&$variables) {
  $variables['theme_hook_suggestions'] = _windup_default_template_suggestions($variables);

  $variables['classes_array'][] = drupal_html_class('comment-' . $variables['id']);
  $variables['classes_array'][] = drupal_html_class('type-comment');
  $variables['classes_array'][] = drupal_html_class('view-mode-' . $variables['elements']['#view_mode']);
}

/**
 * Implements hook_page_alter().
 */
function windup_page_alter(&$page) {
  // Remove all the region wrappers.
  foreach (element_children($page) as $key => $region) {
    if (!empty($page[$region]['#theme_wrappers'])) {
      $page[$region]['#theme_wrappers'] = array_diff($page[$region]['#theme_wrappers'], array('region'));
    }
  }
  // Remove the wrapper from the main content block.
  if (!empty($page['content']['system_main'])) {
    $page['content']['system_main']['#theme_wrappers'] = array_diff($page['content']['system_main']['#theme_wrappers'], array('block'));
  }
  // Remove the wrapper from views blocks.
  if (!empty($page['content'])) {
    foreach ($page['content'] as $key => $value) {
      if (strpos($key, 'views_') !== FALSE) {
        if (!empty($page['content'][$key])) {
          $page['content'][$key]['#theme_wrappers'] = array_diff($page['content'][$key]['#theme_wrappers'], array('block'));
        }
      }
    }
  }
}

/**
 * Helper function to remove classes from classes_array.
 *
 * @param $to_remove
 *   An array of classes to remove.
 * @param $variables
 *   Template variables.
 */
function _windup_remove_classes($to_remove, &$variables) {
  foreach ($variables['classes_array'] as $key => $class) {
    if (in_array($class, $to_remove)) {
      unset($variables['classes_array'][$key]);
    }
  }
}

/**
 * Helper function to create a normalised set of template suggestions.
 *
 * @param $variables
 *   The template variables.
 * @param bool $entity_type
 *   Override the entity type name.
 * @return array
 */
function _windup_default_template_suggestions($variables, $entity_type = FALSE) {
  $entity_type = $entity_type ? $entity_type : $variables['elements']['#entity_type'];
  $theme_hook_suggestions = array(
    $entity_type,
    $entity_type . '__view_mode__' . $variables['elements']['#view_mode'],
    $entity_type . '__' . $variables['elements']['#bundle'],
    $entity_type . '__' . $variables['elements']['#bundle'] . '__' . $variables['elements']['#view_mode'],
    $entity_type . '__' . $variables['id'],
    $entity_type . '__' . $variables['id'] . '__' . $variables['elements']['#view_mode'],
  );

  return $theme_hook_suggestions;
}
