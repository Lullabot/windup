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
 * Implements hook_preprocess_node().
 */
function windup_preprocess_node(&$variables) {
  // Add an 'unpublished' variable.
  $variables['unpublished'] = (!$variables['status']) ? TRUE : FALSE;
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
