//
//  UINavigationController+Interactive.m
//  OurDays
//
//  Created by wangyang on 2017/4/6.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "UIViewController+Interactive.h"
#import "Aspects.h"

@implementation UIViewController (Interactive)
+ (void)load {
  [self aspect_hookSelector:@selector(viewWillAppear:) withOptions:AspectPositionAfter usingBlock:^(id<AspectInfo> info) {
    UIViewController *viewController = [info instance];
    if ([viewController.navigationController respondsToSelector:@selector(interactivePopGestureRecognizer)]) {
      viewController.navigationController.interactivePopGestureRecognizer.enabled = YES;
      viewController.navigationController.interactivePopGestureRecognizer.delegate = self;
    }
  } error:nil];
}

- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer {
  return YES;
}
@end
